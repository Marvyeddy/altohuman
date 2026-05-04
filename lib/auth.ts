import { betterAuth } from "better-auth";
import {Pool} from 'pg'
import { getEmailTemplate } from "./email-helper";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    database: new Pool({
        connectionString:process.env.DATABASE_URL
    }),
    advanced:{
        database:{
            generateId: "uuid"
        },
        defaultCookieAttributes:{
            sameSite:  "none",
            secure: true
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