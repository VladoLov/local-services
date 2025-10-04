"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Phone, MessageCircle, PhoneCall } from "lucide-react"; // icons
import Link from "next/link";

export default function ContactCard({ contact }: { contact: string }) {
  const email = "info@yourdomain.com";
  const phone = contact; // Bosnia format example

  return (
    <Card>
      <CardHeader className="top-6 mb-6">
        <CardTitle className="text-lg font-bold">Contact Provider</CardTitle>
        <CardContent className="px-0">
          <CardDescription className="py-2">
            Reach out via email, phone, WhatsApp, or Viber
            <div className="flex items-center gap-3 my-4">
              <Mail className="text-blue-600 w-6 h-6" />
              <Link
                href={`mailto:${email}`}
                className="text-lg font-medium text-gray-800 hover:underline"
              >
                {email}
              </Link>
            </div>
            {/* Phone */}
            <div className="flex items-center gap-3 mb-4">
              <Phone className="text-green-600 w-6 h-6" />
              <Link
                href={`tel:${phone}`}
                className="text-lg font-medium text-gray-800 hover:underline"
              >
                {phone}
              </Link>
            </div>
            {/* WhatsApp + Viber icons */}
            <div className="flex gap-6 mt-4">
              {/* WhatsApp */}
              <Link
                href={`https://wa.me/${phone.replace("+", "")}`}
                target="_blank"
                className="flex items-center gap-2 text-green-600 hover:text-green-700"
              >
                <MessageCircle className="w-6 h-6" />
                WhatsApp
              </Link>

              {/* Viber */}
              <Link
                href={`viber://chat?number=${phone.replace("+", "")}`}
                target="_blank"
                className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
              >
                <PhoneCall className="w-6 h-6" />
                Viber
              </Link>
            </div>
          </CardDescription>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
