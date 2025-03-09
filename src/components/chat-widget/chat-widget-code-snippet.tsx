"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";

export default function ChatWidgetCodeSnippet() {
  const [copied, setCopied] = useState(false);

  const codeSnippet = `<!-- Email Marketing Platform Chat Widget -->
<script>
  (function() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://cdn.yourdomain.com/chat-widget.js';
    script.setAttribute('data-widget-id', 'YOUR_WIDGET_ID');
    script.setAttribute('data-primary-color', '#2563EB');
    var entry = document.getElementsByTagName('script')[0];
    entry.parentNode.insertBefore(script, entry);
  })();
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Integration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Copy and paste this code snippet into your website's HTML, just before
          the closing <code>&lt;/body&gt;</code> tag.
        </p>

        <div className="relative">
          <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm font-mono whitespace-pre-wrap">
            {codeSnippet}
          </pre>
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-8 w-8 p-0"
            onClick={handleCopy}
          >
            {copied ? (
              <Check size={16} className="text-green-500" />
            ) : (
              <Copy size={16} />
            )}
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Your Widget ID</p>
          <div className="flex gap-2">
            <Input value="chat_widget_123456" readOnly />
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                navigator.clipboard.writeText("chat_widget_123456");
              }}
            >
              <Copy size={16} />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            This unique ID connects the chat widget to your account settings.
          </p>
        </div>

        <div className="rounded-md bg-blue-50 p-4 border border-blue-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-blue-700">
                Need help? Check out our{" "}
                <a href="#" className="font-medium underline">
                  integration guide
                </a>{" "}
                for detailed instructions.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
