import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, User, Lock } from "lucide-react"
import { authService } from '../../services/authService'

// // Mock auth service
// const authService = {
//   signIn: async (email: string, password: string) => {
//     return Promise.resolve()
//   },
//   signUp: async (email: string, password: string) => {
//     return Promise.resolve()
//   },
//   googleAuth: async () => {
//     return Promise.resolve()
//   },
// }

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signup")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

const handleGoogleAuth = async () => {
  setIsLoading(true)
  try {
    await authService.googleAuth();
    // This will redirect to Google, so the loading state will be cleared by page navigation
  } catch (error) {
    console.error("Google auth failed:", error)
    setIsLoading(false)
  }
}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (activeTab === "signin") {
        await authService.signIn(formData.email, formData.password)
      } else {
        await authService.signUp(formData.email, formData.password)
      }
      navigate("/loading")
    } catch (error) {
      console.error("Auth failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden" style={{ background: "#121212" }}>
      {/* Background gradient effects */}
      <div
        className="absolute w-[701px] h-[340px] left-[771px] top-[-219px] rounded-full"
        style={{
          background: "#3D3D3D",
          filter: "blur(197.345px)",
        }}
      />
      <div
        className="absolute w-[446px] h-[446px] left-[191px] top-[522px] rounded-full"
        style={{
          background: "#3D3D3D",
          filter: "blur(197.345px)",
        }}
      />

      Topology background pattern
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {/* Multiple concentric topology lines */}
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className="absolute border rounded-full"
            style={{
              borderColor: "#3B5700",
            //   width: `${1796 - i * 128}px`,
            //   height: `${1754 - i * 129}px`,
            //   left: `${-164 + i * 65}px`,
            //   top: `${-299 + i * 65}px`,
            }}
          />
        ))}
      </div>

      <div className="flex min-h-screen w-full relative z-10">
        {/* Left Side - Branding */}
        <div className="flex-1 flex items-start justify-center relative pt-[53px] pl-12">
          <div
            className="relative"
            style={{
              width: "613px",
              height: "915px",
              background: "rgba(31, 31, 31, 0.3)",
              border: "1px solid #3D3D3D",
              backdropFilter: "blur(6px)",
              borderRadius: "10px",
              boxSizing: "border-box",
            }}
          >
            {/* Vector overlay */}
            <div
              className="absolute"
              style={{
                width: "1505px",
                left: "calc(50% - 1505px/2 - 53px)",
                top: "17.16%",
                bottom: "11.82%",
                mixBlendMode: "overlay",
              }}
            />

            {/* Top decorative line */}
            <div
              className="absolute"
              style={{
                width: "572.5px",
                height: "0px",
                left: "21px",
                top: "48px",
                border: "1px solid #3D3D3D",
              }}
            />

            {/* Bottom decorative line */}
            <div
              className="absolute"
              style={{
                width: "572.5px",
                height: "0px",
                left: "21px",
                top: "867px",
                border: "1px solid #3D3D3D",
              }}
            />

            {/* Content Frame */}
            <div
              className="absolute flex flex-col items-center"
              style={{
                width: "478px",
                height: "130px",
                left: "68px",
                top: "calc(50% - 130px/2 + 0.5px)",
                gap: "36px",
                padding: "0px",
              }}
            >
              {/* Brand Name */}
              <div
                className="flex items-center justify-center"
                style={{
                  width: "478px",
                  height: "47px",
                  fontFamily: "Space Mono, monospace",
                  fontWeight: 400,
                  fontSize: "51.7638px",
                  lineHeight: "77px",
                  textAlign: "center",
                  color: "#E4E7EC",
                  flex: "none",
                  order: 0,
                  alignSelf: "stretch",
                  flexGrow: 1,
                }}
              >
                TELETRAAN
              </div>

              {/* Title */}
              <div
                className="flex items-center justify-center"
                style={{
                  width: "478px",
                  height: "47px",
                  fontFamily: "Lato, sans-serif",
                  fontWeight: 500,
                  fontSize: "24px",
                  lineHeight: "29px",
                  textAlign: "center",
                  color: "#E4E7EC",
                  flex: "none",
                  order: 1,
                  alignSelf: "stretch",
                  flexGrow: 1,
                }}
              >
                The Future of AI-Powered Security
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-[455px]">
            <div className="text-center mb-12">
              <h2
                className="text-4xl font-bold"
                style={{
                  color: "#E4E7EC",
                  fontFamily: "Space Mono, monospace",
                }}
              >
                TELETRAAN
              </h2>
            </div>

            {/* Tabs */}
            <div className="flex mb-8 border" style={{ borderColor: "#3D3D3D" }}>
              <button
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === "signup" ? "border-b-[3px]" : ""
                }`}
                style={{
                  background: "#1F1F1F",
                  color: activeTab === "signup" ? "#F2F4F7" : "#8A8A8A",
                  borderBottomColor: activeTab === "signup" ? "#707070" : "transparent",
                  fontFamily: "Lato, sans-serif",
                }}
                onClick={() => setActiveTab("signup")}
              >
                Sign Up
              </button>
              <button
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === "signin" ? "border-b-[3px]" : ""
                }`}
                style={{
                  background: "#1F1F1F",
                  color: activeTab === "signin" ? "#F2F4F7" : "#8A8A8A",
                  borderBottomColor: activeTab === "signin" ? "#707070" : "transparent",
                  fontFamily: "Lato, sans-serif",
                }}
                onClick={() => setActiveTab("signin")}
              >
                Sign in
              </button>
            </div>

            {/* Google Auth Button */}
            <button
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 rounded-md shadow-sm hover:opacity-90 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed mb-6"
              style={{
                background: "#1F1F1F",
                borderColor: "#242424",
                color: "#E4E7EC",
                boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25), inset 4px 4px 4px rgba(0, 0, 0, 0.25)",
                fontFamily: "Lato, sans-serif",
              }}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Separator */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dashed" style={{ borderColor: "#575757" }} />
              </div>
              <div className="relative flex justify-center text-sm">
                <span
                  className="px-2"
                  style={{
                    background: "#121212",
                    color: "#A3A3A3",
                    fontFamily: "Lato, sans-serif",
                  }}
                >
                  Or Manually
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm mb-2"
                  style={{
                    color: "#E4E7EC",
                    fontFamily: "Lato, sans-serif",
                  }}
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4" style={{ color: "#A3A3A3" }} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter Email"
                    className="w-full pl-10 pr-3 py-2 rounded-none focus:outline-none"
                    style={{
                      background: "#1F1F1F",
                      color: "#E4E7EC",
                      fontFamily: "Lato, sans-serif",
                    }}
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm mb-2"
                  style={{
                    color: "#E4E7EC",
                    fontFamily: "Lato, sans-serif",
                  }}
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4" style={{ color: "#A3A3A3" }} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter Password"
                    className="w-full pl-10 pr-12 py-2 rounded-none focus:outline-none"
                    style={{
                      background: "#1F1F1F",
                      color: "#E4E7EC",
                      fontFamily: "Lato, sans-serif",
                    }}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="w-6 h-6 rounded-sm focus:outline-none"
                      style={{
                        background: "#2E2E2E",
                        boxShadow: "0px 0px 4px #242424, inset 4px 4px 4px rgba(0, 0, 0, 0.25)",
                      }}
                    >
                      {showPassword ? (
                        <EyeOff className="h-3 w-3 mx-auto" style={{ color: "#A3A3A3" }} />
                      ) : (
                        <Eye className="h-3 w-3 mx-auto" style={{ color: "#A3A3A3" }} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {activeTab === "signup" && (
                <div className="pb-8">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm mb-2"
                    style={{
                      color: "#E4E7EC",
                      fontFamily: "Lato, sans-serif",
                    }}
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4" style={{ color: "#A3A3A3" }} />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Enter Password"
                      className="w-full pl-10 pr-12 py-2 rounded-none focus:outline-none"
                      style={{
                        background: "#1F1F1F",
                        color: "#E4E7EC",
                        fontFamily: "Lato, sans-serif",
                      }}
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="w-6 h-6 rounded-sm focus:outline-none"
                        style={{
                          background: "#2E2E2E",
                          boxShadow: "0px 0px 4px #242424, inset 4px 4px 4px rgba(0, 0, 0, 0.25)",
                        }}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-3 w-3 mx-auto" style={{ color: "#A3A3A3" }} />
                        ) : (
                          <Eye className="h-3 w-3 mx-auto" style={{ color: "#A3A3A3" }} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "signin" && (
                <div className="text-left pb-8">
                  <a
                    href="#"
                    className="text-sm hover:opacity-80"
                    style={{
                      color: "#A3A3A3",
                      fontFamily: "Lato, sans-serif",
                    }}
                    onClick={(e) => e.preventDefault()}
                  >
                    Forgot Password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="block mx-auto w-56 font-medium py-2 px-4 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                style={{
                  background: "#A3A3A3",
                  color: "#262626",
                  border: "1px solid #242424",
                  boxShadow: "0px 0px 5px rgba(163, 163, 163, 0.5), inset 4px 4px 4px #707070",
                  fontFamily: "Lato, sans-serif",
                }}
              >
                {isLoading ? "Loading..." : activeTab === "signin" ? "Sign in" : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
