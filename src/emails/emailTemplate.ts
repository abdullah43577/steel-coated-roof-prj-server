interface Props {
  first_name: string;
  last_name: string;
  phone_no: string;
  email: string;
  address: string;
  city: string;
  cur_roof_type: string;
  roof_type_wanted: string;
  building_type: string;
  project_type: string;
  project_details: string | undefined;
}

export const generateEmailTemplate = function ({ first_name, last_name, phone_no, email, address, city, cur_roof_type, roof_type_wanted, building_type, project_type, project_details }: Props) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Roofing Project Inquiry</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            color: #ffffff;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            font-size: 24px;
            margin-bottom: 5px;
        }
        .header p {
            font-size: 14px;
            opacity: 0.9;
        }
        .content {
            padding: 30px 20px;
        }
        .section {
            margin-bottom: 25px;
            padding-bottom: 25px;
            border-bottom: 1px solid #e0e0e0;
        }
        .section:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        .section-title {
            font-size: 16px;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .info-row {
            display: table;
            width: 100%;
            margin-bottom: 12px;
        }
        .info-label {
            display: table-cell;
            width: 180px;
            font-weight: 600;
            color: #555;
            font-size: 14px;
            padding-right: 15px;
        }
        .info-value {
            display: table-cell;
            color: #333;
            font-size: 14px;
            word-break: break-word;
        }
        .message-box {
            background-color: #f8f9fa;
            border-left: 4px solid #2c3e50;
            padding: 15px;
            border-radius: 4px;
            color: #333;
            font-size: 14px;
            line-height: 1.6;
            white-space: pre-wrap;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #777;
        }
        .badge {
            display: inline-block;
            padding: 4px 10px;
            background-color: #e3f2fd;
            color: #1976d2;
            border-radius: 12px;
            font-size: 13px;
            font-weight: 600;
        }
        @media only screen and (max-width: 600px) {
            .info-row {
                display: block;
            }
            .info-label {
                display: block;
                width: 100%;
                margin-bottom: 5px;
            }
            .info-value {
                display: block;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>🏠 New Roofing Project Inquiry</h1>
            <p>A potential client has submitted a project request</p>
        </div>
        
        <div class="content">
            <!-- Client Information -->
            <div class="section">
                <div class="section-title">👤 Client Information</div>
                <div class="info-row">
                    <span class="info-label">Name:</span>
                    <span class="info-value">${first_name} ${last_name}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Email:</span>
                    <span class="info-value"><a href="mailto:${email}" style="color: #1976d2; text-decoration: none;">${email}</a></span>
                </div>
                <div class="info-row">
                    <span class="info-label">Phone:</span>
                    <span class="info-value"><a href="tel:${phone_no}" style="color: #1976d2; text-decoration: none;">${phone_no}</a></span>
                </div>
            </div>

            <!-- Location Details -->
            <div class="section">
                <div class="section-title">📍 Location Details</div>
                <div class="info-row">
                    <span class="info-label">Address:</span>
                    <span class="info-value">${address}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">City:</span>
                    <span class="info-value">${city}</span>
                </div>
            </div>

            <!-- Project Details -->
            <div class="section">
                <div class="section-title">🔨 Project Details</div>
                <div class="info-row">
                    <span class="info-label">Building Type:</span>
                    <span class="info-value"><span class="badge">${building_type}</span></span>
                </div>
                <div class="info-row">
                    <span class="info-label">Project Type:</span>
                    <span class="info-value"><span class="badge">${project_type}</span></span>
                </div>
                <div class="info-row">
                    <span class="info-label">Current Roof Type:</span>
                    <span class="info-value">${cur_roof_type}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Desired Roof Type:</span>
                    <span class="info-value">${roof_type_wanted}</span>
                </div>
            </div>

            <!-- Message -->
            <div class="section">
                <div class="section-title">💬 Client Message</div>
                <div class="message-box">${project_details || "No message provided"}</div>
            </div>
        </div>

        <div class="footer">
            <p>This email was sent from your roofing project website contact form.</p>
            <p style="margin-top: 5px;">Please respond to the client within 24 hours for best results.</p>
        </div>
    </div>
</body>
</html>`;
};
