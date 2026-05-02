import fs from "fs";
import path from "path";

export function getEmailTemplate(templateName: string, variables: Record<string, string>) {
    // This finds the folder relative to where THIS file (email-helper.ts) is located
    // If email-helper is in /lib, we go up one level to find /emails
    const filePath = path.join(process.cwd(), "emails", `${templateName}.html`);
    
    // Check if file exists before reading to prevent the crash
    if (!fs.existsSync(filePath)) {
        console.error("Email template not found at:", filePath);
        return `<p>Welcome! Please verify here: {{url}}</p>`; // Fallback string
    }

    let content = fs.readFileSync(filePath, "utf8");

    Object.entries(variables).forEach(([key, value]) => {
        content = content.replaceAll(`{{${key}}}`, value);
    });

    return content;
}
