export default function ForgotPassword() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
                <p className="mb-4 text-center text-gray-600">
                    Enter your email address to receive a password reset link.
                </p>
                <form className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Send Reset Link
                    </button>
                </form>
            </div>
        </div>
    );
}
