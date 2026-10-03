export default async () => {
  const monitorKey = Netlify.env.get("SAVANNAH_MONITOR_KEY");
  if (!monitorKey) {
    console.error("SAVANNAH_MONITOR_KEY is not configured");
    return;
  }

  const response = await fetch(
    "https://tqiibhjgadukozkjsage.supabase.co/functions/v1/benefitwatch-monitor",
    {
      method: "POST",
      headers: {
        "x-savannah-monitor-key": monitorKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({ source: "netlify-scheduled-function" }),
    },
  );

  if (!response.ok) {
    console.error("BenefitWatch monitor failed", response.status, await response.text());
    return;
  }

  console.log("BenefitWatch monitor completed", await response.text());
};

export const config = {
  schedule: "@hourly",
};
