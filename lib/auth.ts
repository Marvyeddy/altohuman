import { betterAuth } from "better-auth";
import {Pool} from 'pg'
import { getEmailTemplate } from "./email-helper";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    database: new Pool({
        connectionString:process.env.DATABASE_URL,
    }),
    logger: {
        level: "debug", // This will print the specific DB error in your terminal
    },
    baseURL: process.env.BETTER_AUTH_URL, 
    advanced: {
        defaultCookieAttributes: {
            sameSite: "none", // Required for cross-domain cookies
            secure: true,
            httpOnly: true
        }
    },
    user:{
        deleteUser: {
            enabled: true,
            sendDeleteAccountVerification: async ({ user, url }) => {
                const html = getEmailTemplate("delete", {
                    url: url
                });
    
                await resend.emails.send({
                    // MUST match your verified subdomain
                    from: "Altohuman <onboarding@mail.altohuman.site>", 
                    to: user.email,
                    subject: "Delete account permanently - Altohuman",
                    html: html,
                });
            },
        }, 
        additionalFields:{
            credit:{
                type: "number",
                defaultValue: 50,
                input: false
            }, 
            wordLimit: {
                type: "number",
                defaultValue: 300, 
                input: false,
            },
            currentPlan: {
                type: "string",
                defaultValue: "Free", // New users start on the Free tier
                input: false,
            }
        }
    },
    emailAndPassword: { 
        enabled: true,
        requireEmailVerification: true,
        revokeSessionsOnPasswordReset: true, 
        sendResetPassword: async ({ user, url, token }, request) => {
            const html = getEmailTemplate("forgotPassword", {
                name: user.name,
                url: url
            });

            await resend.emails.send({
                // MUST match your verified subdomain
                from: "Altohuman <onboarding@mail.altohuman.site>", 
                to: user.email,
                subject: "Reset your password - Altohuman",
                html: html,
            });
        },

      }, 
      emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true, // Recommended: logs them in immediately
        callbackURL: "/dashboard",
        sendVerificationEmail: async ({ user, url }) => {
            const html = getEmailTemplate("verifications", {
                name: user.name,
                url: url
            });

            await resend.emails.send({
                // MUST match your verified subdomain
                from: "Altohuman <onboarding@mail.altohuman.site>", 
                to: user.email,
                subject: "Verify your email - Altohuman",
                html: html,
            });
        },
    },
    socialProviders: { 
        google: { 
          clientId: process.env.GOOGLE_CLIENT_ID as string, 
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
});