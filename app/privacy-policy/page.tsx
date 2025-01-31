import Link from "next/link";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container px-4 py-12 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>
      <p className="mb-4">Effective Date: 01 February 2025</p>
      <p className="mb-4">
        Welcome to <strong>www.unblur.photos</strong>, an AI photo restoration
        application (&ldquo;Unblur Photos&rdquo; or &ldquo;we&rdquo; or
        &ldquo;us&rdquo; or &ldquo;our&rdquo;). We are committed to protecting
        the privacy of our users (&ldquo;you&rdquo;) and have developed this
        Privacy Policy to demonstrate our commitment to you. This Privacy Policy
        describes the types of information we collect, how we use and protect
        it, and the rights you have concerning your personal information. By
        using our website and services, you agree to the terms of this Privacy
        Policy.
      </p>
      <h2 className="mt-2 text-lg font-bold">1. Information We Collect</h2>
      <p>
        When you use Unblur Photos, we collect the following types of
        information:
      </p>
      <ul className="list-disc list-inside">
        <li>
          Personal Information: We collect your full name and email address when
          you create an account or contact us for support.
        </li>
        <li>
          Public Image Information: We collect public images from your Google
          account if you choose to connect it with our service.
        </li>
        <li>
          Payment Information: We use Stripe, a third-party payment processor,
          to process your payments. We do not directly collect, store, or
          process your payment information.
        </li>
      </ul>
      <h2 className="mt-2 text-lg font-bold">2. How We Use Your Information</h2>
      <p>We use the information we collect for the following purposes:</p>
      <ul className="list-disc list-inside">
        <li>
          To provide our services, including processing and restoring your
          images.
        </li>
        <li>
          To improve our services by analyzing user interactions and
          preferences.
        </li>
        <li>
          To communicate with you regarding updates, promotions, and support.
        </li>
        <li>
          To protect the security and integrity of our services and prevent
          fraud.
        </li>
      </ul>
      <h2 className="mt-2 text-lg font-bold">
        3. How We Protect Your Information
      </h2>
      <p>
        We take the security of your information seriously and implement
        reasonable security measures to protect it from unauthorized access,
        disclosure, alteration, or destruction. These measures include, but are
        not limited to, encryption, access controls, and regular security
        audits. However, no method of transmission or storage is 100% secure,
        and we cannot guarantee absolute security.
      </p>
      <h2 className="mt-2 text-lg font-bold">
        4. Third-Party Service Providers
      </h2>
      <p>
        We use third-party service providers to perform certain functions on our
        behalf, such as:
      </p>
      <ul className="list-disc list-inside">
        <li>Payment processing (Stripe)</li>
        <li>Supabase authentication</li>
        <li>Image hosting</li>
      </ul>
      <p>
        These providers only have access to the information necessary to perform
        their functions and are contractually obligated to protect your
        information and use it only for the purposes for which it was disclosed.
      </p>
      <h2 className="mt-2 text-lg font-bold">5. Your Rights and Choices</h2>
      <p>You have the following rights concerning your personal information:</p>
      <ul className="list-disc list-inside">
        <li>
          Access: You have the right to access your personal information that we
          hold.
        </li>
        <li>
          Correction: You have the right to request correction of any inaccurate
          or incomplete personal information.
        </li>
        <li>
          Deletion: You have the right to request the deletion of your personal
          information, subject to certain legal exceptions.
        </li>
        <li>
          Objection: You have the right to object to the processing of your
          personal information for direct marketing purposes.
        </li>
      </ul>
      <p>
        To exercise any of these rights, please contact us at
        <Link href={"mailto:hi@unblur.photos"}>hi@unblur.photos</Link>
      </p>
      <h2 className="mt-2 text-lg font-bold">Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time to reflect changes
        in our practices or applicable laws. We will notify you of any material
        changes by posting the updated Privacy Policy on our website, and we
        encourage you to review it periodically.
      </p>

      <h2 className="mt-2 text-lg font-bold">Contact Us</h2>
      <p>
        If you have any questions or concerns regarding this Privacy Policy or
        our privacy practices, please contact us at{" "}
        <Link href={"mailto:hi@unblur.photos"}>hi@unblur.photos</Link>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
