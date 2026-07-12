import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { ...corsHeaders, "Content-Type": "application/json" },
});

const esc = (value: unknown) => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const validEmail = (value: string) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

async function getMicrosoftGraphToken(): Promise<string> {
  const tenantId = Deno.env.get("MS_TENANT_ID") || "";
  const clientId = Deno.env.get("MS_CLIENT_ID") || "";
  const clientSecret = Deno.env.get("MS_CLIENT_SECRET") || "";

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error("Microsoft Graph credentials are not configured.");
  }

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    scope: "https://graph.microsoft.com/.default",
    grant_type: "client_credentials",
  });

  const response = await fetch(
    `https://login.microsoftonline.com/${encodeURIComponent(tenantId)}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    },
  );

  const result = await response.json();
  if (!response.ok || !result?.access_token) {
    console.error("Microsoft token error", result);
    throw new Error("Microsoft Graph authentication failed.");
  }

  return String(result.access_token);
}

function graphRecipient(address: string, name?: string) {
  return { emailAddress: { address, ...(name ? { name } : {}) } };
}

async function sendMicrosoftGraphEmail(args: {
  accessToken: string;
  senderEmail: string;
  to: Array<{ email: string; name?: string }>;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<void> {
  const response = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(args.senderEmail)}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${args.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          subject: args.subject,
          body: {
            contentType: "HTML",
            content: args.html,
          },
          toRecipients: args.to.map((recipient) => graphRecipient(recipient.email, recipient.name)),
          ...(args.replyTo && validEmail(args.replyTo) ? { replyTo: [graphRecipient(args.replyTo)] } : {}),
        },
        saveToSentItems: true,
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Microsoft Graph sendMail error", response.status, errorText);
    throw new Error("Microsoft Graph could not send the email.");
  }
}

function renderProductRows(rows: any[]) {
  return rows.map((row: any, index: number) => `<tr>
    <td style="padding:8px;border:1px solid #ddd">${index + 1}</td>
    <td style="padding:8px;border:1px solid #ddd">${esc(row.segment_name_snapshot || "-")}</td>
    <td style="padding:8px;border:1px solid #ddd">${esc(row.category_name_snapshot || "-")}</td>
    <td style="padding:8px;border:1px solid #ddd"><strong>${esc(row.product_name_snapshot || "-")}</strong></td>
    <td style="padding:8px;border:1px solid #ddd">${esc(row.grade_snapshot || "-")}</td>
    <td style="padding:8px;border:1px solid #ddd">${esc(row.specification_snapshot || "-")}</td>
    <td style="padding:8px;border:1px solid #ddd">${esc(row.size_thickness_snapshot || "-")}</td>
    <td style="padding:8px;border:1px solid #ddd">${esc(row.quantity ?? "-")}</td>
    <td style="padding:8px;border:1px solid #ddd">${esc(row.unit || "-")}</td>
  </tr>`).join("");
}

function formatRateOrStatus(row: any) {
  const mode = String(row?.rate_display || "price_on_request");
  if (mode === "coming_soon") return "Coming Soon";
  if (mode === "out_of_stock") return "Currently Unavailable";
  if (mode !== "show_price" || row?.rate === "" || row?.rate == null) return "Price on Request";
  const rate = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(Number(row.rate));
  return row?.pricing_unit ? `₹${rate} / ${row.pricing_unit}` : `₹${rate}`;
}

function renderAcknowledgementRows(rows: any[]) {
  const dash = "—";
  return rows.map((row: any) => `<tr>
    <td style="padding:8px;border:1px solid #ddd"><strong>${esc(row.product_name_snapshot || dash)}</strong></td>
    <td style="padding:8px;border:1px solid #ddd">${esc(row.grade_snapshot || dash)}</td>
    <td style="padding:8px;border:1px solid #ddd">${esc(row.specification_snapshot || dash)}</td>
    <td style="padding:8px;border:1px solid #ddd">${esc(row.size_thickness_snapshot || dash)}</td>
    <td style="padding:8px;border:1px solid #ddd">${esc(row.quantity ?? dash)}</td>
    <td style="padding:8px;border:1px solid #ddd">${esc(row.unit || dash)}</td>
    <td style="padding:8px;border:1px solid #ddd">${esc(formatRateOrStatus(row))}</td>
  </tr>`).join("");
}

function buildInternalHtml(args: {
  companyName: string;
  reference: string;
  customerName: string;
  payload: any;
  mobile: string;
  email: string;
  productRowsHtml: string;
}) {
  return `<!doctype html><html><body style="margin:0;background:#f5f5f5;font-family:Arial,sans-serif;color:#222"><div style="max-width:760px;margin:24px auto;background:#fff;border:1px solid #ddd"><div style="background:#152238;color:#fff;padding:20px 24px"><h1 style="margin:0;font-size:22px">${esc(args.companyName)}</h1><p style="margin:6px 0 0;color:#e7c56b">New Website Enquiry</p></div><div style="padding:24px"><div style="background:#fff8e5;border-left:4px solid #d5a928;padding:12px 16px;margin-bottom:20px"><strong>Enquiry Reference:</strong> ${esc(args.reference)}</div><h2 style="font-size:18px">Customer Details</h2><table style="width:100%;border-collapse:collapse;margin-bottom:22px"><tr><td style="padding:7px;border-bottom:1px solid #eee;width:180px"><strong>Name</strong></td><td style="padding:7px;border-bottom:1px solid #eee">${esc(args.customerName)}</td></tr><tr><td style="padding:7px;border-bottom:1px solid #eee"><strong>Company</strong></td><td style="padding:7px;border-bottom:1px solid #eee">${esc(args.payload?.company_name || "-")}</td></tr><tr><td style="padding:7px;border-bottom:1px solid #eee"><strong>Mobile</strong></td><td style="padding:7px;border-bottom:1px solid #eee">${esc(args.mobile)}</td></tr><tr><td style="padding:7px;border-bottom:1px solid #eee"><strong>Email</strong></td><td style="padding:7px;border-bottom:1px solid #eee">${esc(args.email || "-")}</td></tr><tr><td style="padding:7px;border-bottom:1px solid #eee"><strong>City</strong></td><td style="padding:7px;border-bottom:1px solid #eee">${esc(args.payload?.city || "-")}</td></tr><tr><td style="padding:7px;border-bottom:1px solid #eee"><strong>Source</strong></td><td style="padding:7px;border-bottom:1px solid #eee">${esc(args.payload?.source_page || "Website")}</td></tr></table><h2 style="font-size:18px">Requested Pricing Rows</h2><div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:13px"><thead><tr style="background:#f0f2f5"><th style="padding:8px;border:1px solid #ddd">#</th><th style="padding:8px;border:1px solid #ddd">Segment</th><th style="padding:8px;border:1px solid #ddd">Category</th><th style="padding:8px;border:1px solid #ddd">Product</th><th style="padding:8px;border:1px solid #ddd">Grade</th><th style="padding:8px;border:1px solid #ddd">Specification</th><th style="padding:8px;border:1px solid #ddd">Size / Thickness</th><th style="padding:8px;border:1px solid #ddd">Qty</th><th style="padding:8px;border:1px solid #ddd">Unit</th></tr></thead><tbody>${args.productRowsHtml}</tbody></table></div><h2 style="font-size:18px;margin-top:24px">Requirement Notes</h2><p style="margin:0 0 8px"><strong>Requirement Details:</strong> ${esc(args.payload?.requirement_details || "-")}</p><p style="margin:0"><strong>Additional Message:</strong> ${esc(args.payload?.message || "-")}</p></div></div></body></html>`;
}

function buildAcknowledgementHtml(args: {
  companyName: string;
  reference: string;
  customerName: string;
  contactMobile: string;
  contactEmail: string;
  website: string;
  submittedAt: string;
  payload: any;
  mobile: string;
  email: string;
  acknowledgementRowsHtml: string;
}) {
  const remarks = [args.payload?.requirement_details, args.payload?.message].map((value) => String(value || "").trim()).filter(Boolean);
  return `<!doctype html><html><body style="margin:0;background:#f5f5f5;font-family:Arial,sans-serif;color:#222"><div style="max-width:760px;margin:20px auto;background:#fff;border:1px solid #ddd"><div style="background:#152238;color:#fff;padding:20px 24px"><h1 style="margin:0;font-size:22px">${esc(args.companyName)}</h1><p style="margin:6px 0 0;color:#e7c56b">Enquiry Acknowledgement</p></div><div style="padding:clamp(16px,4vw,24px)"><p>Dear ${esc(args.customerName || "Customer")},</p><p>Thank you. We have received your enquiry and our team will review the submitted requirement shortly.</p><div style="background:#fff8e5;border-left:4px solid #d5a928;padding:12px 16px;margin:20px 0"><strong>Enquiry Reference:</strong> ${esc(args.reference)}<br><span style="font-size:13px">Submitted: ${esc(args.submittedAt)}</span></div><h2 style="font-size:18px">Customer Details</h2><table style="width:100%;border-collapse:collapse;margin-bottom:22px"><tr><td style="padding:7px;border-bottom:1px solid #eee;width:150px"><strong>Name</strong></td><td style="padding:7px;border-bottom:1px solid #eee">${esc(args.customerName || "—")}</td></tr>${args.payload?.company_name ? `<tr><td style="padding:7px;border-bottom:1px solid #eee"><strong>Company</strong></td><td style="padding:7px;border-bottom:1px solid #eee">${esc(args.payload.company_name)}</td></tr>` : ""}${args.payload?.city ? `<tr><td style="padding:7px;border-bottom:1px solid #eee"><strong>City</strong></td><td style="padding:7px;border-bottom:1px solid #eee">${esc(args.payload.city)}</td></tr>` : ""}<tr><td style="padding:7px;border-bottom:1px solid #eee"><strong>Mobile</strong></td><td style="padding:7px;border-bottom:1px solid #eee">${esc(args.mobile || "—")}</td></tr><tr><td style="padding:7px;border-bottom:1px solid #eee"><strong>Email ID</strong></td><td style="padding:7px;border-bottom:1px solid #eee">${esc(args.email || "—")}</td></tr></table><h2 style="font-size:18px">Your Enquiry Details</h2><div style="overflow-x:auto"><table style="width:100%;min-width:700px;border-collapse:collapse;font-size:13px"><thead><tr style="background:#f0f2f5"><th style="padding:8px;border:1px solid #ddd">Product</th><th style="padding:8px;border:1px solid #ddd">Grade</th><th style="padding:8px;border:1px solid #ddd">Specification</th><th style="padding:8px;border:1px solid #ddd">Size / Thickness</th><th style="padding:8px;border:1px solid #ddd">Quantity</th><th style="padding:8px;border:1px solid #ddd">Unit</th><th style="padding:8px;border:1px solid #ddd">Rate / Rate Status</th></tr></thead><tbody>${args.acknowledgementRowsHtml}</tbody></table></div>${remarks.length ? `<h2 style="font-size:18px;margin-top:24px">Customer Remarks</h2>${remarks.map((remark) => `<p style="margin:6px 0;white-space:pre-wrap">${esc(remark)}</p>`).join("")}` : ""}<p style="margin-top:26px">The ${esc(args.companyName)} team will review your enquiry and respond shortly.</p>${args.contactMobile || args.contactEmail ? `<p style="margin-top:18px;font-size:13px">${args.contactMobile ? `<strong>Mobile:</strong> ${esc(args.contactMobile)}<br>` : ""}${args.contactEmail ? `<strong>Email:</strong> ${esc(args.contactEmail)}` : ""}</p>` : ""}<p style="margin-top:26px">Regards,<br><strong>${esc(args.companyName)}</strong><br>${esc(args.website)}</p></div></div></body></html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ success: false, error: "Method not allowed." }, 405);

  try {
    const payload = await req.json();
    if (String(payload?.website || "").trim()) return json({ success: true });

    const customerName = String(payload?.customer_name || "").trim();
    const mobile = String(payload?.mobile || "").trim();
    const email = String(payload?.email || "").trim();
    const products = Array.isArray(payload?.products) ? payload.products : [];

    if (!customerName || !mobile || products.length === 0) {
      return json({ success: false, error: "Name, mobile and at least one product are required." }, 400);
    }
    if (!validEmail(email)) {
      return json({ success: false, error: "Invalid email address." }, 400);
    }
    if (products.length > 25) {
      return json({ success: false, error: "Too many products selected." }, 400);
    }

    const url = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const senderEmail = String(Deno.env.get("MICROSOFT_SENDER_EMAIL") || "enquiry@buycommodity.in").trim();
    if (!validEmail(senderEmail) || !senderEmail) {
      throw new Error("Microsoft sender email is not configured correctly.");
    }

    const client = createClient(url, serviceKey, { auth: { persistSession: false } });

    const { data: result, error: submitError } = await client.rpc("submit_website_enquiry", {
      enquiry_payload: {
        customer_name: customerName,
        company_name: String(payload?.company_name || "").trim(),
        mobile,
        email,
        city: String(payload?.city || "").trim(),
        requirement_details: String(payload?.requirement_details || "").trim(),
        message: String(payload?.message || "").trim(),
        source_page: String(payload?.source_page || "Website").trim(),
        products: products.map((item: any) => ({
          product_id: String(item?.product_id || "").trim(),
          pricing_id: String(item?.pricing_id || "").trim(),
          quantity: item?.quantity === "" || item?.quantity == null ? null : Number(item.quantity),
          unit: String(item?.unit || "").trim(),
        })),
      },
    });
    if (submitError) throw submitError;

    const enquiry = Array.isArray(result) ? result[0] : result;
    const enquiryId = enquiry?.id;
    const reference = enquiry?.enquiry_reference;

    const requestedPricingIds = products.map((item: any) => String(item?.pricing_id || "").trim()).filter(Boolean);
    const [{ data: recipients }, { data: settings }, { data: authoritativeEnquiryRows, error: selectedItemsError }, { data: selectedPricingRows, error: selectedPricingError }] = await Promise.all([
      client.from("enquiry_email_recipients").select("email,display_name").eq("active", true).order("display_order"),
      client.from("site_settings").select("company_name,enquiry_email,mobile_1,mobile_2,whatsapp,email,website").order("id").limit(1).maybeSingle(),
      client.from("enquiry_products").select("product_id,segment_name_snapshot,category_name_snapshot,product_name_snapshot,grade_snapshot,specification_snapshot,size_thickness_snapshot,quantity,unit").eq("enquiry_id", enquiryId),
      client.from("product_pricing").select("pricing_id,product_id,specification,size_thickness,unit,rate,rate_display,grade_master(grade_name)").in("pricing_id", requestedPricingIds),
    ]);
    if (selectedItemsError) throw selectedItemsError;
    if (selectedPricingError) throw selectedPricingError;

    const activeRecipients = (recipients || [])
      .map((recipient: any) => ({
        email: String(recipient.email || "").trim(),
        name: String(recipient.display_name || "").trim() || undefined,
      }))
      .filter((recipient: { email: string }) => validEmail(recipient.email) && recipient.email);

    const fallbackEmail = String(settings?.enquiry_email || "").trim();
    if (!activeRecipients.length && fallbackEmail && validEmail(fallbackEmail)) {
      activeRecipients.push({ email: fallbackEmail });
    }

    // Customer and internal emails share the same RPC-created selected item list.
    // Rate/status is enriched from authoritative Product Pricing rows selected by pricing_id.
    const unusedPricingRows = [...(selectedPricingRows || [])];
    const finalSelectedRows = (authoritativeEnquiryRows || []).map((row: any) => {
      const matchIndex = unusedPricingRows.findIndex((pricing: any) => {
        const gradeRelation = Array.isArray(pricing.grade_master) ? pricing.grade_master[0] : pricing.grade_master;
        return String(pricing.product_id || "") === String(row.product_id || "")
          && String(gradeRelation?.grade_name || "") === String(row.grade_snapshot || "")
          && String(pricing.specification || "") === String(row.specification_snapshot || "")
          && String(pricing.size_thickness || "") === String(row.size_thickness_snapshot || "");
      });
      const pricing = matchIndex >= 0 ? unusedPricingRows.splice(matchIndex, 1)[0] : null;
      return { ...row, rate: pricing?.rate ?? null, rate_display: pricing?.rate_display || "price_on_request", pricing_unit: pricing?.unit || row.unit || "" };
    });
    const productRowsHtml = renderProductRows(finalSelectedRows);
    const acknowledgementRowsHtml = renderAcknowledgementRows(finalSelectedRows);
    const companyName = String(settings?.company_name || "Buy Commodity Solutions Pvt. Ltd.");
    const website = String(settings?.website || "www.buycommodity.in");
    const contactMobile = String(settings?.mobile_1 || settings?.mobile_2 || settings?.whatsapp || "").trim();
    const contactEmail = String(settings?.email || senderEmail).trim();

    const internalHtml = buildInternalHtml({
      companyName,
      reference,
      customerName,
      payload,
      mobile,
      email,
      productRowsHtml,
    });

    const acknowledgementHtml = buildAcknowledgementHtml({
      companyName,
      reference,
      customerName,
      contactMobile,
      contactEmail,
      website,
      submittedAt: new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }).format(new Date()),
      payload,
      mobile,
      email,
      acknowledgementRowsHtml,
    });

    let notificationStatus = "failed";
    try {
      if (!activeRecipients.length) {
        throw new Error("No active enquiry email recipients are configured.");
      }

      const accessToken = await getMicrosoftGraphToken();

      await sendMicrosoftGraphEmail({
        accessToken,
        senderEmail,
        to: activeRecipients,
        subject: `New Website Enquiry – ${reference}`,
        html: internalHtml,
        replyTo: email || undefined,
      });

      notificationStatus = "sent";

      if (email) {
        try {
          await sendMicrosoftGraphEmail({
            accessToken,
            senderEmail,
            to: [{ email, name: customerName }],
            subject: `Thank you for your enquiry – ${reference}`,
            html: acknowledgementHtml,
            replyTo: contactEmail && validEmail(contactEmail) ? contactEmail : senderEmail,
          });
        } catch (ackError) {
          console.error("Customer acknowledgement could not be sent", ackError);
        }
      }
    } catch (mailError) {
      console.error("Enquiry notification could not be sent", mailError);
    }

    await client.from("enquiries").update({ email_notification_status: notificationStatus }).eq("id", enquiryId);

    return json({
      success: true,
      enquiry_reference: reference,
      email_notification_status: notificationStatus,
    });
  } catch (error) {
    console.error(error);
    return json({ success: false, error: "The enquiry could not be processed." }, 500);
  }
});
