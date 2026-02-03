return `<!DOCTYPE html>
<html lang="en">
... full HTML body here ...
</body>
</html>`;
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>YieldAgent - NEAR Network</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #00C08B 0%, #005A46 100%);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      color: white;
    }
    .container { max-width: 800px; width: 100%; }
    .header { text-align: center; margin-bottom: 40px; }
    .logo { font-size: 60px; margin-bottom: 20px; }
    h1 { font-size: 48px; font-weight: 700; margin-bottom: 10px; }
    .subtitle { font-size: 20px; opacity: 0.9; margin-bottom: 10px; }
    .network-badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.2);
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      margin-top: 10px;
    }
    .card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.2);
      margin-bottom: 30px;
    }
    .yields-preview { margin: 30px 0; }
    .yield-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 10px;
      margin-bottom: 10px;
    }
    .protocol-name { font-weight: 600; font-size: 16px; }
    .apy { font-size: 24px; font-weight: 700; color: #00FFA3; }
    .payment-section {
      margin: 30px 0;
      padding: 25px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 15px;
      border: 2px dashed rgba(255, 255, 255, 0.3);
    }
    .payment-details { text-align: center; }
    .cost { font-size: 36px; font-weight: 700; color: #00FFA3; margin: 15px 0; }
    .address-section { margin: 20px 0; }
    .label { font-size: 14px; opacity: 0.8; margin-bottom: 8px; }
    .address-container {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(0, 0, 0, 0.3);
      padding: 15px;
      border-radius: 10px;
      margin-top: 10px;
    }
    .address {
      flex: 1;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      word-break: break-all;
    }
    .copy-btn {
      background: #00FFA3;
      color: #005A46;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      white-space: nowrap;
    }
    .copy-btn:hover { background: #00DD8F; transform: scale(1.05); }
    .try-agent-btn {
      width: 100%;
      background: linear-gradient(135deg, #00FFA3 0%, #00DD8F 100%);
      color: #005A46;
      border: none;
      padding: 18px;
      border-radius: 12px;
      font-size: 18px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s;
      margin-top: 20px;
    }
    .try-agent-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0, 255, 163, 0.3);
    }
    .instructions {
      margin-top: 30px;
      padding: 20px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      font-size: 14px;
      line-height: 1.6;
    }
    .instructions h3 { margin-bottom: 15px; font-size: 18px; }
    .instructions ol { margin-left: 20px; }
    .instructions li { margin-bottom: 10px; }
    code {
      background: rgba(0, 0, 0, 0.4);
      padding: 2px 8px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      font-size: 13px;
    }
    .footer { text-align: center; margin-top: 40px; opacity: 0.7; font-size: 14px; }
    .result-section {
      display: none;
      margin-top: 20px;
      padding: 20px;
      background: rgba(0, 255, 163, 0.1);
      border-radius: 10px;
      border: 1px solid #00FFA3;
    }
    .result-section.show { display: block; }
    .result-item {
      padding: 15px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      margin-bottom: 10px;
    }
    .result-protocol { font-weight: 600; font-size: 16px; margin-bottom: 5px; }
    .result-details { display: flex; gap: 20px; font-size: 14px; opacity: 0.9; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">🌊</div>
      <h1>YieldAgent</h1>
      <p class="subtitle">NEAR Liquid Staking Yields</p>
      <span class="network-badge">🟢 NEAR Protocol</span>
    </div
