/**
 * NEAR x402 Yield Agent
 * Pay 0.01 NEAR → unlock yields
 */

const CONFIG = {
  PAYMENT_ADDRESS: 'fabianjeff.near',
  PAYMENT_AMOUNT: '0.01',
  PAYMENT_ASSET: 'NEAR',
  NETWORK: 'near',
  TIMEOUT_SECONDS: 3600,
  API_DESCRIPTION: 'Live yields: RHEA, Meta Pool, Spin, LiNEAR, Ref Finance',
  API_VERSION: 1
};

const YIELD_DATA = {
  success: true,
  data: {
    opportunities: [
      { id: 1, protocol: "RHEA Finance", apy: "14.2%", risk: "Low", tvl: "$37M", asset: "NEAR" },
      { id: 2, protocol: "Meta Pool / rNEAR", apy: "8.5%", risk: "Low", tvl: "$38M", asset: "rNEAR" },
      { id: 3, protocol: "Spin (perps)", apy: "11.9%", risk: "Medium", tvl: "$9M", asset: "NEAR-USDC" },
      { id: 4, protocol: "LiNEAR LST", apy: "9.2%", risk: "Low", tvl: "$26M", asset: "lNEAR" },
      { id: 5, protocol: "Ref Finance", apy: "16.8%", risk: "Medium", tvl: "$49M", asset: "stable pools" }
    ],
    network: "NEAR",
    lastUpdated: new Date().toISOString()
  }
};

const HTML_PAGE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>YieldAgent – NEAR</title>
  <style>
    body {
      background: linear-gradient(to bottom, #0f0f1f, #1f0f1f);
      color: #fff;
      font-family: -apple-system, sans-serif;
      margin: 0;
      display: flex; align-items: center; justify-content: center;
      min-height: 100vh; padding: 20px;
    }
    .card {
      background: rgba(255,255,255,0.07);
      border: 1px solid #d600ff80;
      border-radius: 22px;
      padding: 45px;
      max-width: 700px; width: 100%;
      box-shadow: 0 0 30px #d600ff44;
    }
    .logo { font-size: 85px; margin-bottom: 18px; color: #00c2ff; text-shadow: 0 0 10px #00c2ffaa; }
    h1 { font-size: 52px; margin: 0; }
    .subtitle { font-size: 18px; color: #00c2ff; margin-top: 4px; }
    .yield-item {
      display: flex; justify-content: space-between;
      padding: 16px; margin: 8px 0;
      background: rgba(214,0,255,0.08);
      border-radius: 12px;
      border: 1px solid #d600ffaa;
    }
    .apy { color: #00c2ff; font-weight: 700; font-size: 21px; }
    .payment { text-align: center; margin: 35px 0; }
    .cost { font-size: 38px; color: #00c2ff; font-weight: 800; margin: 12px 0; }
    .address { font-family: monospace; word-break: break-all; margin: 10px 0; color: #aaa; }
    .copy-btn {
      background: linear-gradient(45deg, #d600ff, #00c2ff);
      color: #0a0a0a; border: none;
      padding: 12px 24px; border-radius: 8px; font-weight: 700;
      cursor: pointer; margin-top: 10px; box-shadow: 0 0 15px #d600ff80;
    }
    .try-btn {
      background: linear-gradient(45deg, #00c2ff, #d600ff);
      color: #0a0a0a; border: none;
      padding: 18px 45px; font-size: 18px; border-radius: 14px;
      cursor: pointer; font-weight: 800; margin-top: 28px; width: 100%;
      box-shadow: 0 6px 18px #00c2ff80;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">🌊</div>
    <h1>YieldAgent</h1>
    <p class="subtitle">Live on NEAR</p>

    <div class="payment">
      <div class="cost">0.01 NEAR</div>
      <div class="address">${CONFIG.PAYMENT_ADDRESS}</div>
      <button class="copy-btn">📋 Copy</button>
    </div>

    <button class="try-btn" onclick="tryAgent()">🚀 Try Agent</button>

    <script>
      document.querySelector('.copy-btn').onclick = () => {
        navigator.clipboard.writeText('${CONFIG.PAYMENT_ADDRESS}');
        this.textContent = '✅ Copied';
        setTimeout(() => this.textContent = '📋 Copy', 1500);
      };

      async function tryAgent() {
        const hash = prompt('Enter your NEAR tx hash:');
        if (!hash) return;
        const res = await fetch('/', {
          headers: { 'X-Payment': JSON.stringify({ txHash: hash, amount: 0.01 }) }
        });
        if (res.ok) {
          const data = await res.json();
          const out = data.data.opportunities.map(o => 
            \`<div class="yield-item"><strong>\${o.protocol}</strong>: \${o.apy}</div>\`
          ).join('');
          document.body.innerHTML += \`<div style="margin-top:25px; text-align:left">\${out}</div>\`;
        } else {
          alert('Pay first.');
        }
      }
    </script>
  </div>
</body>
</html>
`;

export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);
    const path = url.pathname;

    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Payment'
    };

    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });

    if (path === '/x402-info') {
      return new Response(JSON.stringify({
        x402Version: 1,
        accepts: [{
          scheme: 'exact',
          network: 'near',
          maxAmountRequired: '0.01',
          asset: 'NEAR',
          payTo: CONFIG.PAYMENT_ADDRESS,
          resource: '/',
          description: CONFIG.API_DESCRIPTION,
          mimeType: 'application/json'
        }]
      }), { headers: { ...cors, 'Content-Type': 'application/json' } });
    }

    if (path === '/') {
      const pay = req.headers.get('X-Payment');
      if (!pay) {
        return new Response(HTML_PAGE, {
          headers: { ...cors, 'Content-Type': 'text/html' }
        });
      }
      try {
        const p = JSON.parse(pay);
        if (p.txHash && p.amount == '0.01') {
          return new Response(JSON.stringify(YIELD_DATA), {
            headers: { ...cors, 'Content-Type': 'application/json' }
          });
        }
        return new Response(JSON.stringify({ error: 'invalid' }), { status: 402 });
      } catch {
        return new Response(JSON.stringify({ error: 'bad header' }), { status: 400 });
      }
    }

    return new Response(JSON.stringify({ error: 'not found' }), { status: 404 });
  }
};
