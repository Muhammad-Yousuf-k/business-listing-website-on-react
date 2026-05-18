import { useState, useRef } from "react";
import {
  Store,
  Phone,
  MapPin,
  Clock,
  Utensils,
  Image,
  Tag,
  Plus,
  Trash2,
  ChevronRight,
  Upload,
  Info,
  Check,
  Construction,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


import Header from "../../components/dashboardCompo/Header.jsx";
import Sidebar from "../../components/dashboardCompo/Sidebar";
import { Listing_Form_validator } from "../../validator/listing_form_verify.js";
import { useRestaurant } from "../../hooks/useRestaurant.js";
// ─── Constants ───────────────────────────────────────────────────────────────
import { RESTAURANT_CATEGORIES, FOOD_CATEGORIES } from "../../constant/RESTAURANT_CONSTANT.js";

import FieldLabel from "../../components/form_small_compo/FieldLabel";
import FieldInput from "../../components/form_small_compo/FieldInput";
import FieldTextarea from "../../components/form_small_compo/FieldTextarea";
// import FieldSelect from "../../components/form_small_compo/FieldSelect";
import SectionCard from "../../components/form_small_compo/SectionCard";
import SectionTitle from "../../components/form_small_compo/SectionTitle";
import SubText from "../../components/form_small_compo/SubText";


const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
// ─── Helpers ─────────────────────────────────────────────────────────────────

const defaultHours = () =>
  Object.fromEntries(
    DAYS.map((d) => [d, { open: "09:00", close: "22:00", closed: false }])
  );

// ─── Pill Toggle ─────────────────────────────────────────────────────────────

function PillToggle({ options, selected, onChange, multi = true }) {
  const toggle = (opt) => {
    if (!multi) {
      onChange(opt === selected ? "" : opt);
      return;
    }
    if (selected.includes(opt)) onChange(selected.filter((x) => x !== opt));
    else onChange([...selected, opt]);
  };

  return (
    <div className="flex flex-wrap gap-2 sm:gap-[7px]">
      {options.map((opt) => {
        const isSelected = multi ? selected.includes(opt) : selected === opt;

        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`cursor-pointer border-[1.5px] rounded-full px-3 sm:px-[14px] py-1 sm:py-[5px] text-[12px] sm:text-[13px] font-inter inline-flex items-center gap-1 transition-all duration-150 ${isSelected
              ? "border-[#085db7] bg-[#085db7] text-white"
              : "border-slate-200 bg-white text-slate-600"
              }`}
          >
            {isSelected && <Check size={12} />}
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// ─── Toggle Switch ────────────────────────────────────────────────────────────

function ToggleSwitch({ checked, onChange }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={`w-9 h-5 rounded-[10px] relative cursor-pointer transition-colors duration-200 flex-shrink-0 ${checked ? "bg-[#085db7]" : "bg-slate-200"
        }`}
    >
      <div
        className={`absolute w-3.5 h-3.5 rounded-full bg-white top-[3px] transition-all duration-200 ${checked ? "left-[19px]" : "left-[3px]"
          }`}
      />
    </div>
  );
}

// ─── Working Hours Section ────────────────────────────────────────────────────

function WorkingHoursSection({ hours, setHours }) {
  const update = (day, field, val) =>
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: val },
    }));

  return (
    <div>
      {DAYS.map((day) => (
        <div
          key={day}
          className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 py-3 border-b border-slate-100"
        >
          <span className="text-[12px] sm:text-[13px] font-medium text-slate-700 w-full sm:w-[90px] capitalize">
            {day}
          </span>

          <div className="flex items-center gap-2">
            <ToggleSwitch
              checked={!hours[day].closed}
              onChange={(val) => update(day, "closed", !val)}
            />
            <span
              className={`text-[12px] w-[42px] ${hours[day].closed ? "text-slate-400" : "text-slate-700"
                }`}
            >
              {hours[day].closed ? "Closed" : "Open"}
            </span>
          </div>

          {!hours[day].closed && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1">
              <FieldInput
                type="time"
                value={hours[day].open}
                onChange={(e) => update(day, "open", e.target.value)}
                className="flex-1 px-2 sm:px-[10px] py-2 sm:py-[6px] text-[13px]"
              />
              <span className="text-slate-400 text-[12px]">to</span>
              <FieldInput
                type="time"
                value={hours[day].close}
                onChange={(e) => update(day, "close", e.target.value)}
                className="flex-1 px-2 sm:px-[10px] py-2 sm:py-[6px] text-[13px]"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Menu Section ─────────────────────────────────────────────────────────────

// function MenuSection({ items, setItems }) {
//   const add = () => setItems((prev) => [...prev, defaultMenuItem()]);
//   const remove = (id) => setItems((prev) => prev.filter((x) => x.id !== id));
//   const update = (id, field, val) =>
//     setItems((prev) =>
//       prev.map((x) => (x.id === id ? { ...x, [field]: val } : x))
//     );

//   return (
//     <div>
//       {items.map((item, idx) => (
//         <div
//           key={item.id}
//           className="border-[1.5px] border-[#e8edf2] rounded-xl p-4 sm:p-[18px] bg-[#fafbfc] mb-3.5"
//         >
//           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3.5">
//             <span className="font-exo font-semibold text-[14px] text-slate-700">
//               Item #{idx + 1}
//             </span>

//             <button
//               type="button"
//               onClick={() => remove(item.id)}
//               className="w-full sm:w-auto inline-flex items-center justify-center gap-1 bg-transparent text-red-500 border-[1.5px] border-red-300 rounded-lg px-3 sm:px-[10px] py-2 sm:py-[5px] text-[13px] font-inter"
//             >
//               <Trash2 size={13} /> Remove
//             </button>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//             <div>
//               <FieldLabel>Item Name *</FieldLabel>
//               <FieldInput
//                 placeholder="e.g. Classic Burger"
//                 value={item.name}
//                 onChange={(e) => update(item.id, "name", e.target.value)}
//               />
//             </div>

//             <div>
//               <FieldLabel>Price (USD) *</FieldLabel>
//               <FieldInput
//                 type="number"
//                 placeholder="0.00"
//                 value={item.price}
//                 onChange={(e) => update(item.id, "price", e.target.value)}
//               />
//             </div>

//             <div className="col-span-1 sm:col-span-2">
//               <FieldLabel>Description</FieldLabel>
//               <FieldInput
//                 placeholder="Short description of this item"
//                 value={item.description}
//                 onChange={(e) =>
//                   update(item.id, "description", e.target.value)
//                 }
//               />
//             </div>

//             <div>
//               <FieldLabel>Category</FieldLabel>
//               <FieldSelect
//                 value={item.food_category}
//                 onChange={(e) =>
//                   update(item.id, "food_category", e.target.value)
//                 }
//               >
//                 <option value="">Select category</option>
//                 {FOOD_CATEGORIES.map((c) => (
//                   <option key={c} value={c}>
//                     {c}
//                   </option>
//                 ))}
//               </FieldSelect>
//             </div>

//             <div>
//               <FieldLabel>
//                 Tags{" "}
//                 <span className="text-slate-400 font-normal">
//                   (comma separated)
//                 </span>
//               </FieldLabel>
//               <FieldInput
//                 placeholder="spicy, bestseller, new"
//                 value={item.tags}
//                 onChange={(e) => update(item.id, "tags", e.target.value)}
//               />
//             </div>
//           </div>
//         </div>
//       ))}

//       <button
//         type="button"
//         onClick={add}
//         className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent text-[#085db7] border-[1.5px] border-[#085db7] rounded-lg px-5 sm:px-[22px] py-2 sm:py-[10px] font-exo font-semibold text-[13px] sm:text-[14px] mt-1"
//       >
//         <Plus size={15} /> Add Menu Item
//       </button>
//     </div>
//   );
// }

// ─── Chip Input ───────────────────────────────────────────────────────────────

function ChipInput({
  chips,
  onAdd,
  onRemove,
  placeholder,
  chipColor = "#085db7",
  chipBg = "rgba(8,93,183,0.08)",
}) {
  const [input, setInput] = useState("");

  const handleKey = (e) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      const val = input.trim().replace(/,$/, "");
      if (val && !chips.includes(val)) onAdd(val);
      setInput("");
    }
  };

  return (
    <div>
      <FieldInput
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKey}
        className={chips.length ? "mb-3" : ""}
      />

      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-1 rounded-full px-2 sm:px-3 py-1 text-[12px] sm:text-[13px] font-medium"
              style={{ background: chipBg, color: chipColor }}
            >
              {chip}
              <span
                onClick={() => onRemove(chip)}
                className="cursor-pointer font-bold text-[15px] leading-none"
              >
                ×
              </span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}




const CreateListing = () => {
  const navigate = useNavigate();
  const { createRestaurant } = useRestaurant();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    main_category: "",
    sub_category: [],
    contact: { phone: "", tell: "", whatsapp: "", email: "" },
    address: {
      country: "",
      city: "",
      street: "",
      state: "",
      area: "",
      fullAddress: "",
      location: { lat: "", lng: "" },
    },
    workingHours: defaultHours(),
    images: [],
  });
  const [tags, setTags] = useState([]);
  const [features, setFeatures] = useState([]);
  const imageInputRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);



  const set = (path, val) => {
    setForm((prev) => {
      const updated = structuredClone(prev);
      const keys = path.split(".");
      let obj = updated;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = val;
      return updated;
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) =>
        setForm((prev) => ({ ...prev, images: [...prev.images, ev.target.result] }));
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (idx) =>
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {

      const payload = {
        ...form,
        tags,
        features,
      };

      const Form_validator_result = Listing_Form_validator(payload)

      if (Form_validator_result !== null) {
        toast.error(Form_validator_result);
        return
      }

      const res = await createRestaurant(payload)
      if (res) {
        navigate("/owner/dashboard");
      }


    } catch (err) {
      toast.error("listing failed");
    } finally {
      setIsSubmitting(false)
    }
  };




  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-page)", color: "var(--text-main)" }}
    >
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="lg:ml-64 px-4 py-4 lg:px-6 lg:py-6 space-y-6 min-h-screen">

        {/* Header */}
        <Header
          title="Add Listing"
          onMenu={() => setSidebarOpen(true)}
          isBack={false}
          onBack={() => navigate("/dashboard")}

        />

        {/* basic */}
        <>
          <SectionCard>
            <SectionTitle>Basic Information</SectionTitle>

            <div className="grid gap-4">
              <div>
                <FieldLabel>Restaurant Name <span className="text-red-500">*</span></FieldLabel>
                <FieldInput
                  className="w-full"
                  placeholder="e.g. The Golden Fork"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                />
              </div>

              <div>
                <FieldLabel>Description <span className="text-red-500">*</span></FieldLabel>
                <FieldTextarea
                  className="w-full"
                  rows={3}
                  placeholder="Describe your restaurant — cuisine, vibe, specialties..."
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard>
            <SectionTitle>Main Category <span className="text-red-500">*</span></SectionTitle>
            <SubText>
              Select the primary category that best describes your restaurant.
            </SubText>

            <PillToggle
              options={RESTAURANT_CATEGORIES}
              selected={form.main_category}
              onChange={(v) => set("main_category", v)}
              multi={false}
            />
          </SectionCard>

          <SectionCard>
            <SectionTitle>Food Sub-Categories <span className="text-red-500">*</span></SectionTitle>
            <SubText>Select all food types your restaurant serves.</SubText>

            <PillToggle
              options={FOOD_CATEGORIES}
              selected={form.sub_category}
              onChange={(v) => set("sub_category", v)}
            />
          </SectionCard>
        </>
        {/* basic */}

        {/* CONTACT */}
        <SectionCard>
          <SectionTitle>Contact Information</SectionTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: "phone", label: "Mobile Phone", placeholder: "+1 555 000 0000", type: "tel" },
              { key: "tell", label: "Landline / Tell", placeholder: "+1 800 000 0000", type: "tel" },
              { key: "whatsapp", label: "WhatsApp Number", placeholder: "+1 555 000 0000", type: "tel" },
              { key: "email", label: "Email Address", placeholder: "info@restaurant.com", type: "email" },
            ].map((f) => (
              <div key={f.key}>
                <FieldLabel>{f.label}</FieldLabel>
                <FieldInput
                  type={f.type}
                  className="w-full"
                  placeholder={f.placeholder}
                  value={form.contact[f.key]}
                  onChange={(e) => set(`contact.${f.key}`, e.target.value)}
                />
              </div>
            ))}
          </div>
        </SectionCard>
        {/* CONTACT */}

        {/* ADDRESS */}
        <SectionCard>
          <SectionTitle>Address & Location</SectionTitle>

          <div className="grid grid-cols-1 sm:col-span-2 gap-4">
            {[
              { key: "country", label: "Country", placeholder: "United States", required: true },
              { key: "city", label: "City", placeholder: "New York", required: true },
              { key: "area", label: "Area / Neighborhood", placeholder: "Downtown", required: true },
              { key: "state", label: "State", placeholder: "Taxes", required: true },
              { key: "street", label: "Street", placeholder: "123 Main St", required: true },
            ].map((f) => (
              <div key={f.key}>
                <FieldLabel>{f.required === true && (<>{f.label}<span className="text-red-500">*</span> </>)}</FieldLabel>
                <FieldLabel>{f.required === false && (<>{f.label}</>)}</FieldLabel>
                <FieldInput
                  className="w-full"
                  placeholder={f.placeholder}
                  value={form.address[f.key]}
                  onChange={(e) => set(`address.${f.key}`, e.target.value)}
                />
              </div>
            ))}

            <div className="col-span-1 sm:col-span-2">
              <FieldLabel>Full Address</FieldLabel>
              <FieldTextarea
                className="w-full"
                rows={2}
                placeholder="Full address with suite/floor info if applicable"
                value={form.address.fullAddress}
                onChange={(e) => set("address.fullAddress", e.target.value)}
              />
            </div>

            <div>
              <FieldLabel>Latitude</FieldLabel>
              <FieldInput
                type="number"
                step="any"
                className="w-full"
                placeholder="40.7128"
                value={form.address.location.lat}
                onChange={(e) => set("address.location.lat", e.target.value)}
              />
            </div>

            <div>
              <FieldLabel>Longitude</FieldLabel>
              <FieldInput
                type="number"
                step="any"
                className="w-full"
                placeholder="-74.0060"
                value={form.address.location.lng}
                onChange={(e) => set("address.location.lng", e.target.value)}
              />
            </div>
          </div>

          <div className="mt-3 p-3 bg-[rgba(8,93,183,0.05)] rounded-lg flex items-center gap-2">
            <Info size={14} color="#085db7" />
            <span className="text-xs text-slate-600">
              Get lat/lng from Google Maps by right-clicking your location and selecting
              "What's here?".
            </span>
          </div>
        </SectionCard>
        {/* ADDRESS */}

        {/* HOURS */}
        <SectionCard>
          <SectionTitle>Working Hours</SectionTitle>
          <WorkingHoursSection
            hours={form.workingHours}
            setHours={(updater) =>
              setForm((prev) => ({
                ...prev,
                workingHours:
                  typeof updater === "function" ? updater(prev.workingHours) : updater,
              }))
            }
          />
        </SectionCard>
        {/* HOURS */}

        {/* IMAGES */}
        <SectionCard>
          <SectionTitle>Restaurant Images</SectionTitle>
          <SubText>
            Upload photos of your restaurant, food, and ambiance. The first image will be
            used as the cover.
          </SubText>

          <div
            onClick={() => imageInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer transition hover:border-[#085db7]"
          >
            <Upload size={22} color="#94a3b8" className="mx-auto mb-2" />
            <div className="font-['Exo_2'] font-semibold text-[15px] text-slate-700">
              Click to upload images
            </div>
            <div className="text-xs text-slate-400 mt-1">
              JPG, PNG, WEBP — up to 5 MB each
            </div>
          </div>

          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />

          {form.images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {form.images.map((src, i) => (
                <div key={i} className="relative">
                  <img
                    src={src}
                    className="w-20 h-20 object-cover rounded-lg border border-slate-200"
                  />

                  {i === 0 && (
                    <div className="absolute top-1 left-1 bg-[#f1592a] text-white text-[9px] font-bold px-1 rounded">
                      COVER
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
        {/* IMAGES */}

        {/* FEATURES */}
        <>
          <SectionCard>
            <SectionTitle>Features</SectionTitle>
            <SubText>
              Type a feature and press Enter or comma to add.
            </SubText>

            <ChipInput
              chips={features}
              onAdd={(v) => setFeatures((p) => [...p, v])}
              onRemove={(v) => setFeatures((p) => p.filter((x) => x !== v))}
              placeholder="Type a feature and press Enter..."
              chipColor="#085db7"
              chipBg="rgba(8,93,183,0.08)"
            />
          </SectionCard>

          <SectionCard>
            <SectionTitle>Tags</SectionTitle>
            <SubText>Tags help customers discover your listing.</SubText>

            <ChipInput
              chips={tags}
              onAdd={(v) => setTags((p) => [...p, v])}
              onRemove={(v) => setTags((p) => p.filter((x) => x !== v))}
              placeholder="e.g. halal, family-friendly..."
              chipColor="#f1592a"
              chipBg="rgba(241,89,42,0.08)"
            />
          </SectionCard>
        </>
        {/* FEATURES */}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          onClick={handleSubmit} className=" no-wrap rounded-lg bg-(--accent-color) hover:bg-(--primary-color) text-[15px] px-5 py-2 font-medium text-white">
          {isSubmitting ? "Submiting..." : "Submit Listing"}
        </button>
        {/* Submit */}




      </main>
    </div>
  );
};

export default CreateListing;