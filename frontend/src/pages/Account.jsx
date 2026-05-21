import {
  memo,
  useState,
  useRef,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react"
import { AuthContext } from "../context/AuthContext"
import CommonHeroSec from "../components/CommonHeroSec"
import { toast } from "react-toastify"
import ButtonTwo from "../components/ButtonTwo"
import Icon from "../components/Icon"
import RoleCard from "../components/RoleCard"
import Field from "../components/Field"

const inputClass =
  "account-input bg-white border border-gray-200 text-[#1a1a1a] rounded-[10px] px-3.5 py-2.5 text-sm outline-none w-full transition focus:border-[#F1592A] focus:shadow-[0_0_0_3px_rgba(241,89,42,0.1)] placeholder:text-[#c4bfba]"


const SectionCard = memo(({ icon, title, subtitle, children }) => (
  <div className="overflow-hidden rounded-2xl border border-[#f0ede8] bg-white shadow-sm">
    <div className="flex items-center gap-3 border-b border-[#f0ede8] bg-[#fdf9f7] px-6 py-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-[#F1592A]">
        <Icon name={icon} size={17} />
      </span>

      <div>
        <p className="text-sm font-bold text-[#1a1a1a]">{title}</p>
        {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
      </div>
    </div>

    <div className="p-6">{children}</div>
  </div>
))

const SaveBtn = memo(({ loading, label = "Save Changes", onClick }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className={`flex min-w-[140px] items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold text-white transition ${loading
      ? "cursor-not-allowed bg-[#f8a98d]"
      : "cursor-pointer bg-[#F1592A] hover:bg-[#d94820]"
      }`}
  >
    {loading ? (
      <>
        <span className="inline-block animate-spin">
          <Icon name="spinner" size={14} />
        </span>
        Saving...
      </>
    ) : (
      <>
        <Icon name="check" size={14} />
        {label}
      </>
    )}
  </button>
))

export default function Account() {
  const { user, userAvatar, handleUpdateRole, handleUpdateAvatar } =
    useContext(AuthContext)

  const fileRef = useRef(null)

  const [avatarPreview, setAvatarPreview] = useState(
    userAvatar || "/unknownuser.png"
  )
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarLoading, setAvatarLoading] = useState(false)
  const [role, setRole] = useState(user?.role)

  const initials = useMemo(() => {
    return (user?.name || "U")
      .split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
  }, [user?.name])

  const handleRoleSelect = useCallback((value) => {
    setRole(value)
  }, [])

  const handleAvatarChange = useCallback((e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB")
      return
    }

    const previewUrl = URL.createObjectURL(file)
    setAvatarFile(file)
    setAvatarPreview(previewUrl)
  }, [])

  const sendAvatarFile = useCallback(async () => {
    if (!avatarFile) return

    setAvatarLoading(true)

    try {
      const form = new FormData()
      form.append("avatar", avatarFile)

      await handleUpdateAvatar(form)
      setAvatarFile(null)
    } finally {
      setAvatarLoading(false)
    }
  }, [avatarFile, handleUpdateAvatar])

  useEffect(() => {
    return () => {
      if (avatarPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview)
      }
    }
  }, [avatarPreview])

  return (
    <div className="min-h-screen bg-[#faf8f5] font-sans">
      <CommonHeroSec
        pageName="Account"
        heading="My Account"
        para="Manage your profile, security, and location preferences."
      />

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-5 lg:col-span-1">
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#f0ede8] bg-white p-6 text-center shadow-sm">
              <div
                className="group relative h-24 w-24 cursor-pointer"
                onClick={() => fileRef.current?.click()}
              >
                {avatarPreview && avatarPreview !== "/unknownuser.png" ? (
                  <img
                    src={avatarPreview}
                    alt="avatar"
                    loading="lazy"
                    className="h-full w-full rounded-full border-[3px] border-[#F1592A] object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-full border-[3px] border-[#F1592A] bg-orange-100 text-2xl font-bold text-[#F1592A]">
                    {initials}
                  </div>
                )}

                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/45 opacity-0 transition group-hover:opacity-100">
                  <Icon name="camera" size={20} />
                </div>
              </div>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />

              <div>
                <p className="text-base font-bold text-[#1a1a1a]">
                  {user?.name || "User"}
                </p>
                <p className="mt-0.5 text-xs text-gray-400">
                  {user?.email || ""}
                </p>
                <span className="mt-2 inline-block rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-bold capitalize text-[#F1592A]">
                  {user?.role || "viewer"}
                </span>
              </div>

              <button
                onClick={() => fileRef.current?.click()}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-orange-200 bg-orange-50 py-2.5 text-sm font-semibold text-[#F1592A] transition hover:bg-orange-100"
              >
                <Icon name="upload" size={15} />
                Change Photo
              </button>

              {avatarFile && (
                <ButtonTwo loading={avatarLoading} onClick={sendAvatarFile} title="Upload Photo" />
              )}

              <p className="text-xs text-[#c4bfba]">JPG or PNG, max 2MB</p>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-[#f0ede8] bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Account Status
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Icon name="mail" size={14} />
                  Email
                </div>

                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${user?.isVerified
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-red-100 text-red-500"
                    }`}
                >
                  {user?.isVerified ? "Verified" : "Unverified"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Icon name="shield" size={14} />
                  Role
                </div>

                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-600">
                  {user?.role || "error"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-2">
            <SectionCard icon="user" title="Profile Information">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Full Name">
                  <input
                    className={inputClass}
                    value={user?.name || ""}
                    placeholder="John Doe"
                    readOnly
                  />
                </Field>

                <Field label="Email Address">
                  <input
                    className={inputClass}
                    type="email"
                    value={user?.email || ""}
                    placeholder="john@example.com"
                    readOnly
                  />
                </Field>

                <Field label="Country">
                  <input
                    className={inputClass}
                    value={user?.address?.country || ""}
                    placeholder="e.g. United States"
                    readOnly
                  />
                </Field>

                <Field label="State / Province">
                  <input
                    className={inputClass}
                    value={user?.address?.state || ""}
                    placeholder="e.g. New York"
                    readOnly
                  />
                </Field>

                <Field label="City">
                  <input
                    className={inputClass}
                    value={user?.address?.city || ""}
                    placeholder="e.g. Brooklyn"
                    readOnly
                  />
                </Field>
              </div>
            </SectionCard>

            <SectionCard
              icon="mapPin"
              title="Change authorization"
              subtitle="Change your authorization from viewer to owner and list your restaurant"
            >
              <div className="mb-2 grid grid-cols-1 gap-5">
                <div className="flex w-full flex-col gap-2">
                  <RoleCard
                    value="viewer"
                    label={
                      user?.role === "viewer"
                        ? "Food Lover (Current Role)"
                        : "Food Lover"
                    }
                    desc="Discover, vote, and review restaurants near you."
                    icon="user"
                    selected={role === "viewer"}
                    onSelect={handleRoleSelect}
                  />

                  <RoleCard
                    value="owner"
                    label={
                      user?.role === "owner"
                        ? "Restaurant Owner (Current Role)"
                        : "Restaurant Owner"
                    }
                    desc="List your restaurant, manage details, and grow your reach."
                    icon="store"
                    selected={role === "owner"}
                    onSelect={handleRoleSelect}
                  />
                </div>
              </div>

              <ButtonTwo
                onClick={() => handleUpdateRole(role)}
                title="Change Role"
              />
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  )
}