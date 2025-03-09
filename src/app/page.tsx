import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Mail,
  MessageSquare,
  Send,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { createClient } from "../../supabase/server";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 py-20 sm:py-32">
        <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
                  Powerful Email Marketing & Live Chat Platform
                </h1>
                <p className="mt-6 text-lg text-gray-600">
                  Engage with your audience through personalized email campaigns
                  and real-time chat support. Grow your business with our
                  all-in-one marketing solution.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/sign-up">
                  <Button size="lg" className="gap-2">
                    Start for free
                    <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline">
                    See how it works
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CheckCircle2 size={16} className="text-green-500" />
                <span>No credit card required</span>
                <span className="mx-2">•</span>
                <CheckCircle2 size={16} className="text-green-500" />
                <span>Free plan available</span>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80"
                  alt="Email Marketing Dashboard"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 w-48">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 size={18} className="text-blue-600" />
                  <span className="font-medium text-sm">Open Rate</span>
                </div>
                <div className="text-2xl font-bold">42.3%</div>
                <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <ArrowRight size={12} className="rotate-45" /> 12% increase
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Everything You Need to Grow
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our platform provides powerful tools to help you connect with your
              customers and drive engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Email Marketing Feature */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-6">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Email Marketing
              </h3>
              <p className="text-gray-600 mb-6">
                Create beautiful, responsive email campaigns that engage your
                audience and drive conversions.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>Drag-and-drop email editor</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>Automated email sequences</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>Detailed analytics and reporting</span>
                </li>
              </ul>
            </div>

            {/* Live Chat Feature */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-8 shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-emerald-600 text-white flex items-center justify-center mb-6">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Live Chat Support
              </h3>
              <p className="text-gray-600 mb-6">
                Connect with your visitors in real-time with our customizable
                chat widget that integrates with your website.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>Real-time visitor conversations</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>Team collaboration tools</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>Slack & Teams integrations</span>
                </li>
              </ul>
            </div>

            {/* Campaign Management Feature */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 shadow-sm border border-purple-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-purple-600 text-white flex items-center justify-center mb-6">
                <Send size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Campaign Management
              </h3>
              <p className="text-gray-600 mb-6">
                Plan, execute, and analyze your marketing campaigns from a
                single, intuitive dashboard.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>A/B testing capabilities</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>Audience segmentation</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>Performance analytics</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Live Chat Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Connect with your visitors in real-time
              </h2>
              <p className="text-lg text-gray-600">
                Our live chat solution helps you engage with your website
                visitors, answer their questions, and convert them into
                customers.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 size={14} />
                  </div>
                  <div>
                    <h3 className="font-medium">Customizable chat widget</h3>
                    <p className="text-sm text-gray-600">
                      Match your brand's colors and style with our fully
                      customizable chat widget.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 size={14} />
                  </div>
                  <div>
                    <h3 className="font-medium">Team inbox</h3>
                    <p className="text-sm text-gray-600">
                      Collaborate with your team to provide seamless customer
                      support.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 size={14} />
                  </div>
                  <div>
                    <h3 className="font-medium">Offline messaging</h3>
                    <p className="text-sm text-gray-600">
                      Capture leads even when you're not available to chat in
                      real-time.
                    </p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Link href="/sign-up">
                  <Button>Start chatting with visitors</Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden shadow-xl bg-gray-100 p-8 h-[500px]">
                <div className="absolute bottom-8 right-8 w-80 h-[400px] bg-white rounded-lg shadow-2xl overflow-hidden border">
                  <div className="bg-blue-600 p-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                        <MessageSquare size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm text-white">
                          Customer Support
                        </h3>
                        <p className="text-xs text-white opacity-80">Online</p>
                      </div>
                    </div>
                    <button className="text-white opacity-80 hover:opacity-100">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 6L6 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6 6L18 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="p-3 h-[calc(100%-120px)] bg-gray-50">
                    <div className="flex items-start mb-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 mr-2 flex items-center justify-center flex-shrink-0">
                        <MessageSquare size={14} className="text-blue-600" />
                      </div>
                      <div className="max-w-[80%] rounded-lg p-3 bg-gray-200">
                        <p className="text-sm">
                          Hello! How can I help you today?
                        </p>
                        <p className="text-xs mt-1 opacity-70 text-right">
                          10:32 AM
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start justify-end mb-3">
                      <div className="max-w-[80%] rounded-lg p-3 bg-blue-600 text-white">
                        <p className="text-sm">
                          I'm interested in your email marketing platform. Do
                          you offer a free trial?
                        </p>
                        <p className="text-xs mt-1 opacity-70 text-right">
                          10:34 AM
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start mb-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 mr-2 flex items-center justify-center flex-shrink-0">
                        <MessageSquare size={14} className="text-blue-600" />
                      </div>
                      <div className="max-w-[80%] rounded-lg p-3 bg-gray-200">
                        <p className="text-sm">
                          Yes, we offer a 14-day free trial with all features
                          included. No credit card required!
                        </p>
                        <p className="text-xs mt-1 opacity-70 text-right">
                          10:35 AM
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 flex gap-2 items-center border-t">
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Type a message..."
                    />
                    <button className="h-10 w-10 rounded-md bg-blue-600 flex items-center justify-center text-white">
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">$1M+</div>
              <div className="text-blue-100">Funding Raised</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">Uptime Guaranteed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Choose the plan that's right for your business. All plans include
              a 14-day free trial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-xl p-8 shadow-sm border hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Free</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-gray-600 mb-6">
                Perfect for individuals and small businesses just getting
                started.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>Up to 500 subscribers</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>5,000 emails per month</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>Basic email templates</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>Live chat widget</span>
                </li>
              </ul>
              <Link href="/sign-up" className="w-full">
                <Button variant="outline" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-primary relative">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                POPULAR
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-gray-600 mb-6">
                For growing businesses that need more power and features.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>Up to 10,000 subscribers</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>50,000 emails per month</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>Advanced email templates</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>Automation workflows</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>Team chat collaboration</span>
                </li>
              </ul>
              <Link href="/sign-up" className="w-full">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>

            {/* Business Plan */}
            <div className="bg-white rounded-xl p-8 shadow-sm border hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Business
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$149</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-gray-600 mb-6">
                For larger businesses with advanced needs and high volume.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>Up to 50,000 subscribers</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>Unlimited emails</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>Custom email templates</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>Advanced automation</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Link href="/sign-up" className="w-full">
                <Button variant="outline" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us with their
            business.
          </p>
          <Link
            href="/sign-up"
            className="inline-flex items-center px-6 py-3 text-white bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            Get Started Now
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
