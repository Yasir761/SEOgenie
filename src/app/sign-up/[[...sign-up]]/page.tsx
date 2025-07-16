import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-100 flex justify-center items-center min-h-screen">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white",
            card: "shadow-xl border border-gray-200 rounded-xl p-6",
            headerTitle: "text-2xl font-semibold text-gray-800",
            headerSubtitle: "text-sm text-gray-500",
            formFieldInput:
              "border-gray-300 focus:border-purple-500 focus:ring-purple-500",
          },
          variables: {
            colorPrimary: "#9333ea", // Purple-600
          },
        }}
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
      />
    </div>
  );
}
