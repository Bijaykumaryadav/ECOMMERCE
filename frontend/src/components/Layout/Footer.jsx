import {
  FaYoutube,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTelegramPlane,
  FaDiscord,
} from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Footer = () => {
  return (
    <footer className={cn("bg-background text-foreground")}>
      <div className="container px-6 py-12 mx-auto">
        {/* Top Section: Footer Links */}
        <div
          className="grid gap-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4"
        >
          {/* Company Section */}
          <div>
            <h2 className="mb-4 text-lg font-semibold sm:text-sm md:text-base">
              Company
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="/about" className="hover:text-primary">
                  About Us
                </a>
              </li>
              <li>
                <a href="/courses" className="hover:text-primary">
                  Products
                </a>
              </li>
              <li>
                <a
                  href="https://training.mycyber.ninja/#/contact-us"
                  className="hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Support Section */}
          <div>
            <h2 className="mb-4 text-lg font-semibold sm:text-sm md:text-base">
              Customer Support
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="/faq" className="hover:text-primary">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/shipping" className="hover:text-primary">
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a href="/returns" className="hover:text-primary">
                  Returns & Refunds
                </a>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h2 className="mb-4 text-lg font-semibold sm:text-sm md:text-base">
              Help
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="/payments" className="hover:text-primary">
                  Payments
                </a>
              </li>
              <li>
                <a href="/shipping" className="hover:text-primary">
                  Shipping
                </a>
              </li>
              <li>
                <a href="/cancellation-returns" className="hover:text-primary">
                  Cancellation & Returns
                </a>
              </li>
              <li>
                <a
                  href="https://blog.selfmade.ninja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h2 className="mb-4 text-lg font-semibold sm:text-sm md:text-base">
              Stay Updated
            </h2>
            <p className="mb-4 text-sm text-muted-foreground sm:text-xs">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <div className="flex items-center gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow"
              />
              <Button className="text-sm sm:text-xs">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-t border-muted-foreground" />

        {/* Bottom Section: Copyright, Terms, Privacy, and Social Icons */}
        <div
          className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4"
        >
          {/* Copyright */}
          <div className="text-xs sm:text-sm text-muted-foreground lg:text-left">
            © Copyright 2024 company name. All rights reserved.
          </div>

          {/* Terms & Conditions */}
          <div className="text-xs sm:text-sm text-muted-foreground">
            <a href="/terms" className="hover:text-primary">
              Terms & Conditions
            </a>
          </div>

          {/* Privacy Policy */}
          <div className="text-xs sm:text-sm text-muted-foreground">
            <a href="/policy" className="hover:text-primary">
              Privacy Policy
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex sm:justify-start gap-4 sm:gap-2 lg:justify-end">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="sm:w-4 sm-h-4 md:h-5 md:w-5 hover:text-primary" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="sm:w-4 sm-h-4 md:h-5 md:w-5 hover:text-primary" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="sm:w-4 sm-h-4 md:h-5 md:w-5 hover:text-primary" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="sm:w-4 sm-h-4 md:h-5 md:w-5 hover:text-primary" />
            </a>
            <a
              href="https://t.me/mycyberninja"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegramPlane className="sm:w-4 sm-h-4 md:h-5 md:w-5 hover:text-primary" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaDiscord className="sm:w-4 sm-h-4 md:h-5 md:w-5 hover:text-primary" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
