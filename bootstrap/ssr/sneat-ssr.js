import { defineComponent, unref, withCtx, createVNode, useSSRContext, mergeProps, useAttrs, ref, computed, watch, onMounted, inject, toDisplayString, createBlock, createCommentVNode, openBlock, withDirectives, vModelCheckbox, vModelText, renderSlot, createTextVNode, createSSRApp, h } from "vue";
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderSlot, ssrRenderAttr, ssrInterpolate, ssrGetDynamicModelProps, ssrRenderClass, ssrRenderStyle, ssrIncludeBooleanAttr, ssrRenderList, ssrLooseContain } from "vue/server-renderer";
import { Head, router, useForm as useForm$1, Link, usePage, createInertiaApp } from "@inertiajs/vue3";
import { trans, loadLanguageAsync, i18nVue } from "laravel-vue-i18n";
import { route } from "ziggy-js";
import Validator from "validatorjs";
import { toast } from "vue3-toastify";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import debounce from "lodash/debounce.js";
import { createStore } from "vuex";
import axios from "axios";
import createServer from "@inertiajs/vue3/server";
import { renderToString } from "@vue/server-renderer";
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".digits-only").forEach((el) => {
      el.addEventListener("input", function() {
        let pos = this.selectionStart;
        let val = this.value;
        let newVal = val.replace(/[^0-9]/g, "");
        if (this.dataset.max) {
          if (newVal !== "" && Number(newVal) > this.dataset.max) {
            newVal = newVal.slice(0, -1);
          }
        }
        let diff = val.length - newVal.length;
        this.value = newVal;
        this.setSelectionRange(pos - diff, pos - diff);
      });
    });
  });
}
const _sfc_main$w = /* @__PURE__ */ defineComponent({
  __name: "About",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>About Page</title>`);
          } else {
            return [
              createVNode("title", null, "About Page")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1>Hello World: About</h1><!--]-->`);
    };
  }
});
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/About.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const __vite_glob_0_0$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$w
}, Symbol.toStringTag, { value: "Module" }));
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$v = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "authentication-wrapper authentication-cover" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/layouts/Guest.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const Guest = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$u = /* @__PURE__ */ Object.assign({
  name: "BsInput",
  inheritAttrs: false
}, {
  __name: "BsInput",
  __ssrInlineRender: true,
  props: {
    id: String,
    resource: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      default: "text"
    },
    label: {
      type: String,
      default: null
    },
    note: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    error: {
      default: ""
    },
    modelValue: {
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const attrs = useAttrs();
    const model = ref(props.modelValue);
    const computedId = computed(() => {
      return props.id || props.name;
    });
    const showPassword = ref(false);
    const computedLabel = computed(() => {
      if (props.label) return props.label;
      const key = `${props.resource}.attributes.${props.name}`;
      const translated = trans(key);
      return translated === key ? null : translated;
    });
    const computedNote = computed(() => {
      if (props.note) return props.note;
      const key = `${props.resource}.notes.${props.name}`;
      const translated = trans(key);
      return translated === key ? null : translated;
    });
    const computedPlaceholder = computed(() => {
      if (props.placeholder) return props.placeholder;
      const key = `${props.resource}.placeholders.${props.name}`;
      const translated = trans(key);
      const text = translated === key ? null : translated;
      return props.type === "password" ? "············" : text;
    });
    watch(model, (val) => {
      emit("update:modelValue", val);
    });
    watch(
      () => props.modelValue,
      (val) => {
        model.value = val;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0, _temp1;
      if (__props.type === "password") {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-3 form-password-toggle" }, _attrs))}>`);
        ssrRenderSlot(_ctx.$slots, "label", { label: computedLabel.value }, () => {
          if (computedLabel.value) {
            _push(`<label${ssrRenderAttr("for", computedId.value)} class="form-label">${ssrInterpolate(computedLabel.value)}</label>`);
          } else {
            _push(`<!---->`);
          }
        }, _push, _parent);
        _push(`<div class="input-group input-group-merge"><input${ssrRenderAttrs((_temp0 = mergeProps({
          type: showPassword.value ? "text" : "password"
        }, unref(attrs), {
          name: __props.name,
          id: computedId.value,
          placeholder: computedPlaceholder.value,
          class: ["form-control", { "is-invalid": !!__props.error }],
          "aria-describedby": "password"
        }), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, model.value))))}><span class="input-group-text cursor-pointer">`);
        if (!showPassword.value) {
          _push(`<i class="bx bx-hide"></i>`);
        } else {
          _push(`<i class="bx bx-show"></i>`);
        }
        _push(`</span></div></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-3" }, _attrs))}>`);
        ssrRenderSlot(_ctx.$slots, "label", { label: computedLabel.value }, () => {
          if (computedLabel.value) {
            _push(`<label${ssrRenderAttr("for", computedId.value)} class="form-label">${ssrInterpolate(computedLabel.value)}</label>`);
          } else {
            _push(`<!---->`);
          }
        }, _push, _parent);
        _push(`<div><input${ssrRenderAttrs((_temp1 = mergeProps({ type: __props.type }, unref(attrs), {
          name: __props.name,
          id: computedId.value,
          placeholder: computedPlaceholder.value,
          class: ["form-control", { "is-invalid": !!__props.error }]
        }), mergeProps(_temp1, ssrGetDynamicModelProps(_temp1, model.value))))}>`);
        if (computedNote.value) {
          _push(`<small class="text-muted">${ssrInterpolate(computedNote.value)}</small>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.error) {
          _push(`<div class="text-danger">${ssrInterpolate(__props.error)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      }
    };
  }
});
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Form/BsInput.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const _sfc_main$t = /* @__PURE__ */ Object.assign({
  name: "BsCheckbox",
  inheritAttrs: false
}, {
  __name: "BsCheckbox",
  __ssrInlineRender: true,
  props: {
    id: String,
    resource: { type: String, required: true },
    name: { type: String, required: true },
    label: { type: String, default: null },
    note: { type: String, default: null },
    error: { type: String, default: "" },
    modelValue: {},
    value: { default: true },
    falseValue: { default: false }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const uniqueId = Math.random().toString(36).slice(2, 9);
    const computedId = computed(() => {
      return props.id != null ? props.id : `checkbox-${uniqueId}-${props.name}`;
    });
    const computedLabel = computed(() => {
      if (props.label !== null) return props.label;
      const key = `${props.resource}.attributes.${props.name}`;
      const translated = trans(key);
      return translated === key ? null : translated;
    });
    const computedNote = computed(() => {
      if (props.note !== null) return props.note;
      const key = `${props.resource}.notes.${props.name}`;
      const translated = trans(key);
      return translated === key ? null : translated;
    });
    const isChecked = computed(() => {
      if (Array.isArray(props.modelValue)) {
        return props.modelValue.includes(props.value);
      }
      return props.modelValue === props.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-3" }, _attrs))}><div class="form-check"><input${ssrRenderAttrs(mergeProps({ type: "checkbox" }, _ctx.$attrs, {
        name: __props.name,
        value: __props.value,
        checked: isChecked.value,
        id: computedId.value,
        class: ["form-check-input", { "is-invalid": !!__props.error }]
      }))}>`);
      ssrRenderSlot(_ctx.$slots, "label", { label: computedLabel.value }, () => {
        if (computedLabel.value) {
          _push(`<label${ssrRenderAttr("for", computedId.value)} class="form-check-label">${ssrInterpolate(computedLabel.value)}</label>`);
        } else {
          _push(`<!---->`);
        }
      }, _push, _parent);
      _push(`</div>`);
      ssrRenderSlot(_ctx.$slots, "note", { note: computedNote.value }, () => {
        if (computedNote.value) {
          _push(`<small class="text-muted ps-4">${ssrInterpolate(computedNote.value)}</small>`);
        } else {
          _push(`<!---->`);
        }
      }, _push, _parent);
      ssrRenderSlot(_ctx.$slots, "error", { error: __props.error }, () => {
        if (__props.error) {
          _push(`<div class="text-danger ps-4">${ssrInterpolate(__props.error)}</div>`);
        } else {
          _push(`<!---->`);
        }
      }, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Form/BsCheckbox.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const ar = {
  accepted: "يجب قبول حقل :attribute.",
  accepted_if: "يجب قبول حقل :attribute عندما يكون :other هو :value.",
  active_url: "يجب أن يكون حقل :attribute عنوان URL صالحًا.",
  after: "يجب أن يكون حقل :attribute تاريخًا بعد :date.",
  after_or_equal: "يجب أن يكون حقل :attribute تاريخًا بعد أو يساوي :date.",
  alpha: "يجب أن يحتوي حقل :attribute على أحرف فقط.",
  alpha_dash: "يجب أن يحتوي حقل :attribute على أحرف وأرقام وشرطات وشرطات سفلية فقط.",
  alpha_num: "يجب أن يحتوي حقل :attribute على أحرف وأرقام فقط.",
  any_of: "حقل :attribute غير صالح.",
  array: "يجب أن يكون حقل :attribute مصفوفة.",
  ascii: "يجب أن يحتوي حقل :attribute على رموز وأحرف ألفا رقمية أحادية البايت فقط.",
  before: "يجب أن يكون حقل :attribute تاريخًا قبل :date.",
  before_or_equal: "يجب أن يكون حقل :attribute تاريخًا قبل أو يساوي :date.",
  between: {
    array: "يجب أن يحتوي حقل :attribute على عدد من العناصر بين :min و :max.",
    file: "يجب أن يكون حجم ملف :attribute بين :min و :max كيلوبايت.",
    numeric: "يجب أن تكون قيمة حقل :attribute بين :min و :max.",
    string: "يجب أن يتراوح عدد أحرف حقل :attribute بين :min و :max."
  },
  boolean: "يجب أن تكون قيمة حقل :attribute صحيحة أو خاطئة.",
  confirmed: "تأكيد حقل :attribute غير متطابق.",
  contains: "حقل :attribute يفتقد قيمة مطلوبة.",
  current_password: "كلمة المرور غير صحيحة.",
  date: "يجب أن يكون حقل :attribute تاريخًا صالحًا.",
  date_equals: "يجب أن يكون حقل :attribute تاريخًا يساوي :date.",
  date_format: "يجب أن يتطابق حقل :attribute مع التنسيق :format.",
  decimal: "يجب أن يحتوي حقل :attribute على :decimal منازل عشرية.",
  declined: "يجب رفض حقل :attribute.",
  declined_if: "يجب رفض حقل :attribute عندما يكون :other هو :value.",
  different: "يجب أن يكون حقل :attribute مختلفًا عن :other.",
  digits: "يجب أن يحتوي حقل :attribute على :digits أرقام.",
  digits_between: "يجب أن يحتوي حقل :attribute على عدد أرقام بين :min و :max.",
  dimensions: "أبعاد الصورة في حقل :attribute غير صالحة.",
  distinct: "حقل :attribute يحتوي على قيمة مكررة.",
  doesnt_end_with: "يجب ألا ينتهي حقل :attribute بأحد القيم التالية: :values.",
  doesnt_start_with: "يجب ألا يبدأ حقل :attribute بأحد القيم التالية: :values.",
  email: "يجب أن يكون حقل :attribute عنوان بريد إلكتروني صالح.",
  ends_with: "يجب أن ينتهي حقل :attribute بأحد القيم التالية: :values.",
  enum: "القيمة المختارة في حقل :attribute غير صالحة.",
  exists: "القيمة المختارة في حقل :attribute غير صالحة.",
  extensions: "يجب أن يحتوي حقل :attribute على أحد الامتدادات التالية: :values.",
  file: "يجب أن يكون حقل :attribute ملفًا.",
  filled: "يجب ملء حقل :attribute.",
  gt: {
    array: "يجب أن يحتوي حقل :attribute على أكثر من :value عنصر.",
    file: "يجب أن يكون حجم ملف :attribute أكبر من :value كيلوبايت.",
    numeric: "يجب أن تكون قيمة حقل :attribute أكبر من :value.",
    string: "يجب أن يكون عدد أحرف حقل :attribute أكبر من :value."
  },
  gte: {
    array: "يجب أن يحتوي حقل :attribute على :value عناصر أو أكثر.",
    file: "يجب أن يكون حجم ملف :attribute أكبر من أو يساوي :value كيلوبايت.",
    numeric: "يجب أن تكون قيمة حقل :attribute أكبر من أو تساوي :value.",
    string: "يجب أن يكون عدد أحرف حقل :attribute أكبر من أو يساوي :value."
  },
  hex_color: "يجب أن يكون حقل :attribute لون سداسي عشري صالح.",
  image: "يجب أن يكون حقل :attribute صورة.",
  in: "القيمة المختارة في حقل :attribute غير صالحة.",
  in_array: "يجب أن يكون حقل :attribute موجودًا في :other.",
  integer: "يجب أن يكون حقل :attribute عددًا صحيحًا.",
  ip: "يجب أن يكون حقل :attribute عنوان IP صالح.",
  ipv4: "يجب أن يكون حقل :attribute عنوان IPv4 صالح.",
  ipv6: "يجب أن يكون حقل :attribute عنوان IPv6 صالح.",
  json: "يجب أن يكون حقل :attribute سلسلة JSON صالحة.",
  lowercase: "يجب أن يكون حقل :attribute بأحرف صغيرة.",
  lt: {
    array: "يجب أن يحتوي حقل :attribute على أقل من :value عنصر.",
    file: "يجب أن يكون حجم ملف :attribute أقل من :value كيلوبايت.",
    numeric: "يجب أن تكون قيمة حقل :attribute أقل من :value.",
    string: "يجب أن يكون عدد أحرف حقل :attribute أقل من :value."
  },
  lte: {
    array: "يجب ألا يحتوي حقل :attribute على أكثر من :value عنصر.",
    file: "يجب أن يكون حجم ملف :attribute أقل من أو يساوي :value كيلوبايت.",
    numeric: "يجب أن تكون قيمة حقل :attribute أقل من أو تساوي :value.",
    string: "يجب أن يكون عدد أحرف حقل :attribute أقل من أو يساوي :value."
  },
  mac_address: "يجب أن يكون حقل :attribute عنوان MAC صالح.",
  max: {
    array: "يجب ألا يحتوي حقل :attribute على أكثر من :max عنصر.",
    file: "يجب ألا يتجاوز حجم ملف :attribute :max كيلوبايت.",
    numeric: "يجب ألا تكون قيمة حقل :attribute أكبر من :max.",
    string: "يجب ألا يتجاوز عدد أحرف حقل :attribute :max."
  },
  max_digits: "يجب ألا يحتوي حقل :attribute على أكثر من :max أرقام.",
  mimes: "يجب أن يكون ملف :attribute من نوع: :values.",
  mimetypes: "يجب أن يكون ملف :attribute من نوع: :values.",
  min: {
    array: "يجب أن يحتوي حقل :attribute على الأقل :min عنصر.",
    file: "يجب أن يكون حجم ملف :attribute على الأقل :min كيلوبايت.",
    numeric: "يجب أن تكون قيمة حقل :attribute على الأقل :min.",
    string: "يجب أن يكون عدد أحرف حقل :attribute على الأقل :min."
  },
  min_digits: "يجب أن يحتوي حقل :attribute على الأقل :min أرقام.",
  not_in: "القيمة المختارة في حقل :attribute غير صالحة.",
  not_regex: "تنسيق حقل :attribute غير صالح.",
  numeric: "يجب أن تكون قيمة حقل :attribute رقمًا.",
  password: {
    letters: "يجب أن يحتوي حقل :attribute على حرف واحد على الأقل.",
    mixed: "يجب أن يحتوي حقل :attribute على حرف كبير وحرف صغير على الأقل.",
    numbers: "يجب أن يحتوي حقل :attribute على رقم واحد على الأقل.",
    symbols: "يجب أن يحتوي حقل :attribute على رمز واحد على الأقل.",
    uncompromised: "تم العثور على :attribute في تسريب بيانات. يرجى اختيار قيمة مختلفة."
  },
  present: "يجب أن يكون حقل :attribute موجودًا.",
  prohibited: "حقل :attribute محظور.",
  prohibited_if: "حقل :attribute محظور عندما يكون :other هو :value.",
  prohibited_unless: "حقل :attribute محظور ما لم يكن :other ضمن :values.",
  regex: "تنسيق حقل :attribute غير صالح.",
  required: "حقل :attribute مطلوب.",
  required_if: "حقل :attribute مطلوب عندما يكون :other هو :value.",
  required_unless: "حقل :attribute مطلوب ما لم يكن :other ضمن :values.",
  required_with: "حقل :attribute مطلوب عند وجود :values.",
  required_with_all: "حقل :attribute مطلوب عند وجود جميع القيم: :values.",
  required_without: "حقل :attribute مطلوب عند عدم وجود :values.",
  required_without_all: "حقل :attribute مطلوب عند عدم وجود أي من: :values.",
  same: "يجب أن يطابق حقل :attribute حقل :other.",
  size: {
    array: "يجب أن يحتوي حقل :attribute على :size عنصر.",
    file: "يجب أن يكون حجم ملف :attribute :size كيلوبايت.",
    numeric: "يجب أن تكون قيمة حقل :attribute :size.",
    string: "يجب أن يكون عدد أحرف حقل :attribute :size."
  },
  starts_with: "يجب أن يبدأ حقل :attribute بأحد القيم التالية: :values.",
  string: "يجب أن يكون حقل :attribute سلسلة نصية.",
  timezone: "يجب أن يكون حقل :attribute نطاق زمني صالح.",
  unique: "تم استخدام :attribute مسبقًا.",
  uploaded: "فشل في رفع :attribute.",
  uppercase: "يجب أن يكون حقل :attribute بأحرف كبيرة.",
  url: "يجب أن يكون حقل :attribute عنوان URL صالح.",
  uuid: "يجب أن يكون حقل :attribute UUID صالح.",
  attributes: {
    name: "الاسم",
    username: "اسم المستخدم",
    password: "كلمة المرور",
    email: "البريد الإلكتروني",
    website: "الموقع الإلكتروني",
    firstname: "الاسم الأول",
    lastname: "الاسم الأخير",
    subject: "الموضوع",
    city: "المدينة",
    region: "المنطقة",
    country: "الدولة",
    street: "الشارع",
    zipcode: "الرمز البريدي",
    phone: "رقم الهاتف",
    mobile: "رقم الجوال"
  }
};
const en = {
  accepted: "The :attribute must be accepted.",
  accepted_if: "The :attribute must be accepted when :other is :value.",
  active_url: "The :attribute must be a valid URL.",
  after: "The :attribute must be a date after :date.",
  after_or_equal: "The :attribute must be a date after or equal to :date.",
  alpha: "The :attribute may only contain letters.",
  alpha_dash: "The :attribute may only contain letters, numbers, dashes, and underscores.",
  alpha_num: "The :attribute may only contain letters and numbers.",
  any_of: "The :attribute field is invalid.",
  array: "The :attribute must be an array.",
  ascii: "The :attribute may only contain single-byte alphanumeric characters and symbols.",
  before: "The :attribute must be a date before :date.",
  before_or_equal: "The :attribute must be a date before or equal to :date.",
  between: {
    array: "The :attribute must have between :min and :max items.",
    file: "The :attribute must be between :min and :max kilobytes.",
    numeric: "The :attribute must be between :min and :max.",
    string: "The :attribute must be between :min and :max characters."
  },
  boolean: "The :attribute field must be true or false.",
  confirmed: "The :attribute confirmation does not match.",
  contains: "The :attribute field is missing a required value.",
  current_password: "The password is incorrect.",
  date: "The :attribute must be a valid date.",
  date_equals: "The :attribute must be a date equal to :date.",
  date_format: "The :attribute must match the format :format.",
  decimal: "The :attribute must have :decimal decimal places.",
  declined: "The :attribute must be declined.",
  declined_if: "The :attribute must be declined when :other is :value.",
  different: "The :attribute must be different from :other.",
  digits: "The :attribute must be :digits digits.",
  digits_between: "The :attribute must be between :min and :max digits.",
  dimensions: "The :attribute has invalid image dimensions.",
  distinct: "The :attribute field has a duplicate value.",
  doesnt_end_with: "The :attribute must not end with one of the following: :values.",
  doesnt_start_with: "The :attribute must not start with one of the following: :values.",
  email: "The :attribute must be a valid email address.",
  ends_with: "The :attribute must end with one of the following: :values.",
  enum: "The selected :attribute is invalid.",
  exists: "The selected :attribute is invalid.",
  extensions: "The :attribute must have one of the following extensions: :values.",
  file: "The :attribute must be a file.",
  filled: "The :attribute field must be filled.",
  gt: {
    array: "The :attribute must have more than :value items.",
    file: "The :attribute must be greater than :value kilobytes.",
    numeric: "The :attribute must be greater than :value.",
    string: "The :attribute must be greater than :value characters."
  },
  gte: {
    array: "The :attribute must have :value items or more.",
    file: "The :attribute must be greater than or equal to :value kilobytes.",
    numeric: "The :attribute must be greater than or equal to :value.",
    string: "The :attribute must be greater than or equal to :value characters."
  },
  hex_color: "The :attribute must be a valid hexadecimal color.",
  image: "The :attribute must be an image.",
  in: "The selected :attribute is invalid.",
  in_array: "The :attribute must exist in :other.",
  integer: "The :attribute must be an integer.",
  ip: "The :attribute must be a valid IP address.",
  ipv4: "The :attribute must be a valid IPv4 address.",
  ipv6: "The :attribute must be a valid IPv6 address.",
  json: "The :attribute must be a valid JSON string.",
  lowercase: "The :attribute must be lowercase.",
  lt: {
    array: "The :attribute must have less than :value items.",
    file: "The :attribute must be less than :value kilobytes.",
    numeric: "The :attribute must be less than :value.",
    string: "The :attribute must be less than :value characters."
  },
  lte: {
    array: "The :attribute must not have more than :value items.",
    file: "The :attribute must be less than or equal to :value kilobytes.",
    numeric: "The :attribute must be less than or equal to :value.",
    string: "The :attribute must be less than or equal to :value characters."
  },
  mac_address: "The :attribute must be a valid MAC address.",
  max: {
    array: "The :attribute must not have more than :max items.",
    file: "The :attribute must not be greater than :max kilobytes.",
    numeric: "The :attribute must not be greater than :max.",
    string: "The :attribute must not be greater than :max characters."
  },
  max_digits: "The :attribute must not have more than :max digits.",
  mimes: "The :attribute must be a file of type: :values.",
  mimetypes: "The :attribute must be a file of type: :values.",
  min: {
    array: "The :attribute must have at least :min items.",
    file: "The :attribute must be at least :min kilobytes.",
    numeric: "The :attribute must be at least :min.",
    string: "The :attribute must be at least :min characters."
  },
  min_digits: "The :attribute must have at least :min digits.",
  not_in: "The selected :attribute is invalid.",
  not_regex: "The :attribute format is invalid.",
  numeric: "The :attribute must be a number.",
  password: {
    letters: "The :attribute must contain at least one letter.",
    mixed: "The :attribute must contain at least one uppercase and one lowercase letter.",
    numbers: "The :attribute must contain at least one number.",
    symbols: "The :attribute must contain at least one symbol.",
    uncompromised: "The :attribute has appeared in a data leak. Please choose a different value."
  },
  present: "The :attribute field must be present.",
  prohibited: "The :attribute field is prohibited.",
  prohibited_if: "The :attribute field is prohibited when :other is :value.",
  prohibited_unless: "The :attribute field is prohibited unless :other is in :values.",
  regex: "The :attribute format is invalid.",
  required: "The :attribute field is required.",
  required_if: "The :attribute field is required when :other is :value.",
  required_unless: "The :attribute field is required unless :other is in :values.",
  required_with: "The :attribute field is required when :values is present.",
  required_with_all: "The :attribute field is required when :values are present.",
  required_without: "The :attribute field is required when :values is not present.",
  required_without_all: "The :attribute field is required when none of :values are present.",
  same: "The :attribute must match :other.",
  size: {
    array: "The :attribute must contain :size items.",
    file: "The :attribute must be :size kilobytes.",
    numeric: "The :attribute must be :size.",
    string: "The :attribute must be :size characters."
  },
  starts_with: "The :attribute must start with one of the following: :values.",
  string: "The :attribute must be a string.",
  timezone: "The :attribute must be a valid timezone.",
  unique: "The :attribute has already been taken.",
  uploaded: "The :attribute failed to upload.",
  uppercase: "The :attribute must be uppercase.",
  url: "The :attribute must be a valid URL.",
  uuid: "The :attribute must be a valid UUID.",
  attributes: {
    name: "Name",
    username: "Username",
    password: "Password",
    email: "Email",
    website: "Website",
    firstname: "First Name",
    lastname: "Last Name",
    subject: "Subject",
    city: "City",
    region: "Region",
    country: "Country",
    street: "Street",
    zipcode: "Zip Code",
    phone: "Phone",
    mobile: "Mobile"
  }
};
const supportedLocales = [
  {
    "name": "English",
    "code": "en",
    "dir": "ltr",
    "flag": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" viewBox="0 0 7410 3900"><path fill="#b22234" d="M0 0h7410v3900H0z"/><path d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0" stroke="#fff" stroke-width="300"/><path fill="#3c3b6e" d="M0 0h2964v2100H0z"/><g fill="#fff"><g id="d"><g id="c"><g id="e"><g id="b"><path id="a" d="m247 90 70.534 217.082-184.66-134.164h228.253L176.466 307.082z"/><use xlink:href="#a" y="420"/><use xlink:href="#a" y="840"/><use xlink:href="#a" y="1260"/></g><use xlink:href="#a" y="1680"/></g><use xlink:href="#b" x="247" y="210"/></g><use xlink:href="#c" x="494"/></g><use xlink:href="#d" x="988"/><use xlink:href="#c" x="1976"/><use xlink:href="#e" x="2470"/></g></svg>'
  },
  {
    "name": "Arabic",
    "code": "ar",
    "dir": "rtl",
    "flag": '<svg width="30" height="30" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg"><path d="M0 600h900V0H0z" fill="#005430"/><path d="M675 238.324c-.063-10.54-4.152-38.931-5.19-48.455-1.036-9.525-2.08-18.165-1.828-20.189.247-1.952 3.252 2.715 4.84 3.092.822-.164.455-3.112-1.038-5.63-1.01-1.709-4.456-8.1-6.546-11.846-.983-1.773-1.203-2.8-1.676-3.019-.471-.217-4.276 7.458-3.86 8.31 1.038 1.56 1.75 2.304 1.912 5.059.164 2.755 1.589 22.427 3.405 37.338 1.367 11.249 4.366 35.484 4.473 50.552.03 4.915-.515 9.6-1.17 11.558-1.679 3.074-4.303 5.847-14.076 11.565-10.986 6.43-25.643 11.781-31.943 15.362-3.917 2.234-2.619 2.532.792 1.555 3.401-.978 20.992-4.11 29.538-7.721 8.022-3.399 13.23-9.084 17.182-17.378 4.881-10.254 5.253-18.955 5.185-30.153M640.987 158.261c.85-.329 7.88-.691 9.774-.301-1.244 1.778-9.675 5.713-9.71 6.435.23.486 5.823-.9 7.587-1.67 1.153-.693 1.923-1.767 2.777-2.658 2.016-2.32 4.407-6.622 3.805-7.162-.978-.871-10.562-.329-11.825-.15-.846.122-2.994 3.972-3.388 4.96-.386.987.131.875.98.546" fill="#fff"/><path d="M655.35 220.733a29.577 29.577 0 0 0-.167-17.325c-2.049-6.526-7.138-10.504-10.808-12.543l-.655 6.283s5.147 2.558 8.666 8.998c2.23 4.085 3.158 9.861 1.397 16.3-.293 1.599.85.718 1.567-1.714M600.9 252.24a26.66 26.66 0 0 0-.148-15.6c-1.846-5.877-6.429-9.46-9.735-11.29l-.591 5.656s4.634 2.304 7.803 8.098c2.01 3.675 2.844 8.884 1.263 14.68-.263 1.434.764.644 1.408-1.544M411.862 166.691c2.12 3.877 3 9.368 1.332 15.483-.28 1.517.8.684 1.487-1.625a28.143 28.143 0 0 0-.164-16.459c-1.948-6.201-6.782-9.977-10.27-11.91l-.615 5.967s4.889 2.428 8.23 8.544M284.25 168.697c1.78 4.174 1.9 9.809-.975 15.745-.559 1.491.802.785 1.945-1.446 2.333-4.561 3.643-10.27 2.46-16.575-1.214-6.483-6.084-10.902-9.73-13.295l-1.654 5.923s5.146 3.07 7.954 9.648" fill="#fff"/><path d="M319.526 261.983c2.263-4.2 3.205-7.025 4.21-12 .88-4.375.937-9.43.62-14.576 6.77-2.76 14.84-7.341 17.551-7.678-1.854 6.367 2.572 13.237 11.513 12.34.684 7.2 1.27 13.524 1.627 17.274.728 7.689.619 17.378.597 19.062-.03 1.691 1.194 1.372 2.451-2.396 1.676-5.045 2.194-18.218 1.586-26.93-.145-2.178-.392-5.118-.69-8.468 5.796-2.682 6.76-7.858 8.926-10.064 1.956 6.85 12.72 7.78 16.043 6.313 4.12-1.82 5.47-5.095 6.53-12.695 1.063-7.597-2.032-10.656-3.139-11.484-.11.92-2.805 9.848-2.805 9.848s2.556 2.7 2.685 4.027c-2.082 1.884-6.473 2-10.16.8-3.69-1.2-4.82-3.408-4.601-4.89.213-1.486 1.602-2.839 1.649-4.65.04-1.81-.827-1.286-2.304.317-1.476 1.606-2.43 3.05-4.473 6.496-1.67 2.818-4.382 6.257-9.165 7.24-.789-8.276-1.69-17.081-2.292-22.612-.315-2.92-3.462-28.153-3.687-30.976-.195-2.46-.559-5.359-.499-6.721.06-1.084.74-.654 1.792.48 1.054 1.133 2.898 3.108 3.215 2.954 1.074-.527-.024-3.807-1.43-6.744-1.402-2.945-6.19-14.564-7.195-15.043-.518-.243-3.75 6.909-3.941 8.317.5.88 1.81 2.266 1.857 6.207.016 1.099.723 11.461 1.703 21.26.858 8.652 1.994 16.863 2.104 17.817.78 6.605 1.728 15.914 2.63 25.066-5.191-.988-6.572-4.411-6.457-6.364.132-2.203 1.126-4.69.65-5.252-1-.6-6.95 2.725-15.246 6.298a156.799 156.799 0 0 1-7.738 3.1c-.723-6.238-1.676-12.169-2.06-16.704l-.046-.504c5.456-.352 9.923-3.107 11.956-5.73 2.539-3.28 4.314-10.03 4.486-15.2.173-5.177-4.004-14.64-4.998-17.649-1.003-3.01-1.52-5.098-1.608-6.138-.09-1.041 2.257 1.205 3.733 1.646 1 .2.655-1.966-.567-3.452-1.213-1.482-7.776-11.441-8.236-10.743-.282.41-2.912 7.737-3.084 8.859 1.035.684 2.246 2.568 2.33 4.373.088 1.806 1.534 9.745 3.137 14.157 1.608 4.411 5.031 12.874 5.248 15.202-2.446 1.724-8.015 4.644-13.523 4.47-.942-7.72-2.137-16.684-2.775-23.033-.246-2.454-.263-5.072-.224-6.44.03-1.084.81-.934 1.884.18 1.08 1.114 2.734 2.735 3.073 2.618.74-.245.099-2.704-1.366-5.624s-7.29-15.27-8.31-15.731c-.518-.236-3.126 6.7-3.29 8.116.52.876 1.854 2.231 1.985 6.171.105 3.138 1.633 18.515 2.942 32.058-5.45-2.818-7.31-6.847-7.984-13.611-.471-4.716-.518-13.402-2.2-20.668-.947-4.107-2.944-8.28-5.31-10.496-.565 1.365-3.085 9.744-3.085 9.744.822 2.406 3.377 10.507 3.29 17.527-.085 7.02-.638 13.883-8.505 18.61-7.861 4.731-19.653 2.85-22.565-4.53-2.911-7.384 3.561-25.899 3.476-30.27-.087-4.37-.868-4.973-2.695-4.251-1.824.721-5.558 4.935-8.773 11.79-3.216 6.86-4.646 15.357-6.473 21.133-1.821 5.777-4.738 11.63-9.252 11.305-4.514-.319-6.944-4.45-8.333-10.423-1.391-5.98-.54-13.853-.161-15.87.942-5.056-1.24-4.02-2.578 3.917-.827 4.895-1.649 12.712 1.263 20.895 2.906 8.182 7.861 11.233 12.203 10.188 4.344-1.041 8.162-11.23 9.51-15.805 1.345-4.569 7.362-24.86 10.77-25.859.476 2.287-2.649 9.659-3.649 18.282-.997 8.623 1.329 20.206 12.274 22.21 10.945 2.005 18.371-5.094 21.064-10.022 2.695-4.935 3.952-10.11 4.256-12.715.35 6.615 4.865 16.944 13.633 19.89l.903.26c.54 5.415 1.42 12.483 2.227 19.905a82.861 82.861 0 0 1-5.144 1.413c-.219-.711-.46-1.408-.753-2.048-2.676-5.757-7.105-11.062-13.243-10.695-6.27.372-13.107 8.74-12.808 14.85.197 4.11 2.46 7.484 10.688 8.347 3.758.398 7.748-.02 11.87-.92.581 1.7.948 3.39.99 4.929-2.608 3.049-24.184 19.322-40.339 20.887-16.155 1.563-21.082-6.906-21.244-15.407-.12-6.468 3.769-12.923 6.502-17.39 3.912-2.862 7.122-6.44 9.149-9.2.55.34 1.074.653 1.572.944 1.931 1.122 2.701 2.799 2.701 2.799.356-.547 2.016-3.536 1.367-4.997-.299-.36-1.759-1.258-3.514-2.325 1.843-4.593 1.818-9.18-.57-10.2-2.67-1.137-6.158 2.023-7.661 3.95a5.12 5.12 0 0 0-1.085 3.095c-.011 1.228.567 2.337 1.997 3.325 1.424.973 2.747 1.854 3.99 2.649-3.53 3.707-11.873 9.14-16.979 12.33-.189-.468-.937.026-1.942 1.21l-1.383.854c-4.073 2.492-13.84 7.965-15.76 9.304-1.924 1.343-.718 1.1 0 .8 1.355-.731 3.135-1.618 5.135-2.595 2.832-1.385 6.127-2.953 9.348-4.526a47.64 47.64 0 0 0-2.813 5.567c-3.843 9.073-10.055 27.879 3.383 39.194 12.857 10.831 34.956 6.71 53.283-4.546 18.33-11.259 22.288-15.217 25.153-19.31m-59.755-44.732c-.636-.469-.724-1.094-.206-1.53.66-.562 1.504-1.094 2.463-1.273 2.032-.378 2.843 1.957 2.027 5.594-1.545-.945-3.134-1.938-4.284-2.791m42.039 15.339c-9.332.043-9.762-1.651-9.587-2.735.173-1.079 3.079-4.04 6.766-2.087 1.558.828 3.314 2.56 4.938 4.736-.717.053-1.424.08-2.117.086m-28.582 49.075c-17.632 4.812-34.83-2.643-35.871-17.405-.797-11.272 3.314-19.765 5.965-24.552 2.529-1.25 4.917-2.466 6.892-3.555-4.615 7.433-7.316 17.387-5.511 25.82 2.043 9.553 10.354 15.344 24.424 13.475 13.931-1.846 32.768-15.095 38.109-20.092 1.627-1.803 2.7-3.429 4.163-6.741.603-1.36 1.45-3.155 1.764-5.184.206-1.322.315-2.735.34-4.173a102.378 102.378 0 0 0 4.933-1.624c.562 6.048.975 12.01 1 17.165-8.68 10.18-28.577 22.052-46.208 26.866M581.625 242.955c-.597-9.876-2.038-27.753-2.843-36.821-.712-8.071-2.112-19.133-3.136-28.87a52.124 52.124 0 0 1-.258-6.164c.03-1.078 1.11-.663 2.189.446s2.766 2.502 3.084 2.332c1.054-.547-.208-3.251-1.69-6.161-1.482-2.915-7.357-14.972-8.379-15.43-.52-.233-3.273 6.99-3.432 8.405.526.871 1.87 2.221 2.016 6.161.148 3.943 2.14 22.07 3.577 36.73.997 10.191 2.285 26.819 3.221 39.357-.046.02.885 11.92.986 13.257.576 7.699.277 17.385.22 19.067-.064 1.689 1.172 1.395 2.498-2.353 1.35-3.827 2.12-12.37 2.224-20.085zM531.563 208.38c-1.808.552-4.646-1.36-4.43-5.369.198-3.621 1.748-7.012 2.345-9.152.822-2.953.827-5.8.132-4.186-1.567 3.606-4.484 10.578-5.087 15.309-.605 4.73.929 7.78 3.013 8.82 2.597 1.304 4.467-.765 5.733-3.814 1.216-2.92.986-6.328.142-5.526-.706.839-.97 3.647-1.848 3.918M505.575 222.952c.959-2.547 1.183-5.044.446-3.674-1.662 3.07-4.776 9-5.689 13.12-.909 4.12.195 6.909 1.948 7.965 2.186 1.322 3.985-.372 5.347-2.968 1.3-2.484 1.366-5.5.567-4.847-.69.689-1.148 3.137-1.937 3.317-1.64.362-3.98-1.512-3.473-5.027.46-3.165 2.095-6.044 2.791-7.886M429.9 276.697c1.602-2.6 2.4-5.297 1.287-3.935-2.481 3.044-7.179 8.952-9.074 13.285-1.89 4.333-1.288 7.587.397 9.069 2.1 1.848 4.443.329 6.489-2.252 1.964-2.474 2.698-5.756 1.67-5.196-.9.63-1.93 3.221-2.837 3.27-1.865.09-4.018-2.394-2.698-6.137 1.194-3.378 3.607-6.22 4.766-8.103M562.575 200.798c-1.838.46-4.555-1.598-4.1-5.592.413-3.604 2.169-6.908 2.89-9.01 1.002-2.91 1.174-5.749.383-4.179-1.775 3.525-5.106 10.332-5.996 15.027-.89 4.693.455 7.815 2.476 8.963 2.52 1.428 4.503-.537 5.955-3.52 1.389-2.852 1.367-6.266.471-5.506-.753.805-1.183 3.594-2.079 3.817M562.013 249.791c2.514 1.429 4.508-.537 5.954-3.52 1.386-2.851 1.367-6.265.477-5.505-.759.8-1.189 3.593-2.085 3.816-1.838.458-4.56-1.598-4.1-5.591.414-3.604 2.167-6.911 2.89-9.01 1-2.91 1.172-5.754.383-4.18-1.78 3.526-5.105 10.333-5.996 15.023-.89 4.698.455 7.82 2.477 8.967M594.15 187.208c1.21-3.52 1.419-6.957.46-5.055-2.153 4.264-6.18 12.5-7.258 18.185-1.074 5.68.556 9.456 3.002 10.846 3.043 1.727 5.45-.65 7.206-4.257 1.674-3.451 1.65-7.587.57-6.662-.912.97-1.435 4.343-2.52 4.614-2.219.557-5.514-1.933-4.958-6.764.501-4.361 2.624-8.36 3.498-10.907" fill="#fff"/><path d="M337.32 248.093c1.98-4.29 2.698-8.585 1.24-6.299-3.261 5.118-9.405 15.028-11.503 22.048-2.101 7.022-.545 11.955 2.344 13.978 3.605 2.513 6.944-.212 9.62-4.545 2.561-4.156 3.07-9.36 1.594-8.32-1.274 1.115-2.375 5.304-3.772 5.524-2.87.45-6.683-3.049-5.352-9.063 1.205-5.427 4.4-10.219 5.829-13.323M614.625 290.625c1.517-1.243 14.714-8.352 17.144-9.795 0 0 2.484-4.052 1.74-4.483-.749-.43-5.567 3.95-8.563 4.072-3 .122-7.105-2.081-7.237-3.887.39-1.362 3.997-3.409 5.3-3.492 1.304-.076 1.093 2.892 1.529 3.254.435.357 2.17-2.049 2.388-3.051.214-1 .036-5.19-2.35-4.59-3.777.956-9.474 7.96-10.124 10.163-.654 2.209 2.866 4.13 5.435 5.177-.22.08-2.137 1.002-3.35 2.203 0 0-1.304 1.461-1.912 4.429M569.625 299.43c1.517-1.243 14.714-8.347 17.144-9.795 0 0 2.49-4.052 1.74-4.483-.749-.43-5.567 3.95-8.563 4.072-3 .122-7.105-2.081-7.237-3.887.39-1.362 3.997-3.409 5.3-3.487 1.304-.081 1.093 2.884 1.529 3.244.435.362 2.17-2.044 2.388-3.046.214-1 .03-5.19-2.35-4.59-3.777.96-9.474 7.96-10.124 10.168-.654 2.204 2.866 4.126 5.43 5.172-.214.08-2.132 1-3.345 2.203 0 0-1.304 1.461-1.912 4.429M468.263 172.02c1.183 1.375 8.934 11.224 15.007 17.415 6.07 6.197 16.475 16.226 24.12 23.099a294.932 294.932 0 0 1 4.646 4.277c1.928 14.804 4.158 33.643 5.094 41.433.923 7.67 1.06 17.357 1.08 19.043.016 1.69 1.232 1.345 2.388-2.446 1.55-5.088 1.728-18.261.907-26.963-.51-5.373-1.712-15.44-2.876-24.721 4.514 4.46 8.778 8.884 11.652 12.196 5.283 6.08 9.729 10.667 12.438 17.203 1.917 4.624 1.723 8.304 2.509 9.03.68.628 1.43-4.905.591-10.271-1.358-8.714-3.22-12.409-14.407-24.85-4.268-4.757-9.291-9.728-14.202-14.375-.19-1.433-.362-2.76-.518-3.938-.389-2.91-4.18-28.066-4.478-30.885-.255-2.454-.702-5.343-.666-6.708.027-1.087.718-.664 1.802.446 1.08 1.106 2.97 3.043 3.29 2.874 1.057-.547-.12-3.796-1.602-6.711-1.477-2.91-6.563-14.422-7.585-14.878-.518-.233-3.566 6.987-3.722 8.4.528.871 1.87 2.229 2.016 6.164.04 1.099 1.016 11.446 2.24 21.216 1.085 8.633 2.427 16.82 2.567 17.768l.005.073c-5.064-4.619-9.526-8.542-12.232-11.006-6.328-5.75-20.302-19.398-20.864-21.442-.126-.645.959-.248 2.953.071 2.002.322 3.782 1.003 3.462.02-.145-.463-.912-1.607-2.821-2.788-1.912-1.182-6.81-4.246-10.453-6.414-3.65-2.165-5.459-3.981-6.212-3.462-.372.256-.04 7.673.178 8.598.912.078 2.515 1.152 3.692 2.532" fill="#fff"/><path d="M478.237 158.681c1.499-.329 8.598-.15 11.176.393-1.08.75-8.343 4.419-9.779 5.293-1.427.876-1.788 1.382-1.07 1.296 2.081-.577 6.773-1.296 9.022-2.469 2.12-.993 5.733-5.835 7.138-7.64 1.397-1.806 1.397-2.707 1.04-3.191-1.434-.78-10.687-1.563-15.149-.456-1.235.838-3.651 5.303-4.007 6.232-.356.935.131.871 1.63.542M517.725 158.1c1.21-.266 6.933-.122 9.006.314-.868.605-6.719 3.563-7.875 4.272-1.158.702-1.446 1.112-.868 1.041 1.679-.46 5.462-1.04 7.272-1.99 1.707-.8 4.618-4.703 5.75-6.154 1.125-1.459 1.125-2.183.838-2.57-1.15-.636-8.61-1.264-12.206-.37-.997.673-2.939 4.272-3.226 5.021-.293.75.104.702 1.309.436M549.825 157.688c1.205-.266 6.927-.122 9 .314-.862.605-6.716 3.563-7.874 4.267-1.153.706-1.441 1.116-.863 1.046 1.679-.461 5.755-1.046 7.565-1.991 1.71-.8 3.734-4.703 4.865-6.159 1.131-1.453 1.131-2.183.838-2.565-1.15-.636-8.023-1.264-11.614-.375-.997.679-2.944 4.277-3.232 5.027s.104.701 1.315.435M529.8 173.321c-1.9 2.994.482 5.41 1.35 7.828-1.172 1.071-2.974.094-3.577-.846-1.282-1.927-.852-5.855-2.361-6.46-.386 1.061-.638 2.239-.638 2.239s1.148 2.686.86 4.464c-.184 1.074-1.131 2.328-2.383 2.353-3.336.08-1.693-4.857-2.98-7.656-.263.684-.452 1.419-.759 2.06.236.729.364 1.752.403 2.342.076 1.172-.017 2.436.183 3.436.277 1.416 1.063 2.355 2.263 2.446 2.492.198 3.629-1.82 4.004-3.477.43 1.69 3.725 3.55 5.347 1.477 2.147-2.735.43-5.078-.671-7.65-.794-1.902-.564-3.15-1.041-2.556M436.162 165.382c.173 1.231.806 2.072 1.838 2.199 2.131.27 3.21-1.424 3.613-2.832.282 1.472 3.038 3.204 4.536 1.487 1.98-2.272.608-4.358-.219-6.62-.592-1.676-.337-2.74-.775-2.246-1.78 2.497.161 4.682.794 6.802-1.063.871-2.566-.043-3.043-.871-1.013-1.715-.46-5.08-1.726-5.665-.383.901-.654 1.902-.654 1.902s.857 2.362.523 3.88c-.205.919-1.08 1.96-2.164 1.932-2.873-.064-1.224-4.252-2.205-6.711-.255.575-.455 1.205-.753 1.737.173.643.235 1.524.235 2.039.022 1.012-.12 2.091 0 2.967M504.15 281.362c.32-.509 1.027-1.906.85-2.861s-1.349-4.938-3.62-5.936c-2.256-.998-3.965 1.094-5.047 4.004l-.75-.018c-.179.43-.403 1.074-.582 2.236-.252 1.679-.728 2.76-3.607 5.374-2.421 2.188-10.266 7.443-15.35 9.912-5.089 2.474-8.751 4.609-10.101 5.257-1.345.638-.954.876.391.474 1.342-.4 8.097-2.576 10.79-3.685 2.687-1.117 5.973-2.953 9.934-5.523 4.405-2.857 7.037-5.713 7.922-8.246.63-1.805.791-2.527.791-2.527s1.655.977 4.462 1.618c2.797.643 3.591.436 3.917-.078m-3.796-5.66c1.246.473 2.005 1.83 2.23 2.654-1.43.032-4.063-.694-5.183-1.2.674-1.305 1.846-1.87 2.953-1.454" fill="#fff"/><path d="M474.338 284.164c-3.906-.542-13.748-2.039-16.156-7.752 2.022-2.948 11.332-6.68 22.995-10.173 11.663-3.484 23.85-8.007 27.125-10.19.718-.243 2.106-.17 2.106-.17.587-1.689 3.515-7.62 3.698-8.86-3.26.184-23.35 1.66-32.274 2.14-8.93.48-26.126.364-31.856.3 3.514-2.527 11.855-7.46 23.775-11.669 1.545-.547 2.975-1.04 4.309-1.486.991 1.767 1.728 3.515 1.882 5.037.758-.78 1.328-3.366 1.136-6.02 6.95-2.218 10.53-2.953 12.074-3.37.975-1.264 2.704-6.375 2.961-10.09-1.038-1.891-4.29-4.247-7.182-6.27-3.985-2.783-8.283-5.21-12.572-4.148-5.864 1.438-7.04 12.211-5.673 14.496.436.721 1.468 2 2.687 3.578-4.284 1.684-8.765 3.664-12.714 5.746-8.798 4.634-18.62 9.704-21.486 14.579l-.821.4c-.23.461-2.044 8.005-2.307 8.818 1.83-.063 15.492-.038 25.008-.334 9.51-.304 17.826-.606 21.083-.606-4.824 1.143-17.465 5.84-21.1 8.603-3.634 2.77-5.919 6.982-5.979 14.202-3.388-1.327-9.685-4.358-15.051-11.616-5.982-8.089-4.744-16.408-7.138-27.325-3.479-15.843-10.907-29.22-15.533-33.311-1.559 5.591-1.759 9.805-1.759 9.805s5.796 12.814 8.73 20.994c2.933 8.182 5.44 16.243 5.316 18.048-2.416 5.298-16.716 16.395-28.634 22.89-11.302 6.16-21.258 6.823-24.786 2.437-.693-.856-1.164-1.869-1.43-3.016 1.534-.717 3.073-1.439 4.651-2.16 10.162-4.63 28.21-14.374 32.439-19.487 4.563-6.197 4.5-14.921 1.824-19.915-2.665-4.992-6.845-10.77-7.17-12.814-.255-.965 2.714.392 4.467.484.849-.064.424-1.206-1.397-3.012-1.457-1.438-7.092-6.105-9.245-7.926-.54-.463-.942-.276-1.051.213-.42 1.864-1.277 5.855-1.608 7.825l.23.993c.619.367 1.331.78 1.676 1.81.488 1.461 2.194 5.539 4.99 10.685 2.803 5.143 6.851 10.82 7.248 13.687-3.292 4.199-19.894 13.14-36.065 20.51 1-3.1 2.577-6.604 4.67-10.497.594-.658 1.137-1.47 1.64-2.388 1.614-2.947 1.77-6.551.792-5.789-.838.808-1.44 3.733-2.4 3.93-1.963.403-4.719-1.889-4.026-6.08.628-3.78 2.65-7.194 3.523-9.38 1.21-3.024 1.542-6.012.624-4.386-2.062 3.631-5.932 10.667-7.121 15.582-1.183 4.908.074 8.263 2.147 9.562.775.494 1.518.649 2.224.552-1.418 2.7-3.171 6.012-4.45 9.963-6.503 2.91-12.83 5.51-18.068 7.384-18.825 6.74-32.241 10.71-41.625 13.658l-.367.164c.69-2.23.597-4.135-.143-3.563-.838.813-1.438 3.738-2.396 3.93-1.964.403-4.72-1.886-4.03-6.08.63-3.78 2.652-7.19 3.526-9.377 1.205-3.021 1.539-6.015.624-4.386-2.065 3.631-5.933 10.666-7.121 15.579-1.187 4.91.07 8.266 2.141 9.567 2.58 1.621 4.78-.367 6.467-3.441l.592-1.264c.586 0 1.575-.137 3.051-.466 4.3-.967 15.052-2.527 29.834-4.454 10.946-1.424 18.503-4.43 25.808-7.775a29.89 29.89 0 0 0-.006 2.48c.398 10.03 6.971 12.862 15.961 10.985 8.672-1.82 20.765-9.773 28.013-15.136 7.557-5.592 11.917-10.588 13.03-12.33 2.015-4.273 2.569-8.993 2.706-11.22.66 6.134 1.194 14.623 6.995 21.904 5.341 6.7 16.287 16.05 36.874 16.306.068-2.449-.913-10.094-.913-10.094m-1.36-62.156c2.946-3.307 9.235-1.144 13.955 3.05-2.419.567-5.703 1.577-9.327 2.871-2.153-2.596-4.555-5.098-4.629-5.92M357.236 176.663c1.337-.61 5.426-2.45 9.834-5.017 4.398-2.55 8.532-5.64 10.553-7.694.775-.787 1.466-1.403 1.907-2.135 1.32.547 2.23 1.115 2.796 1.338.852.329 1.989.802 2.728-1.624.737-2.423-.24-3.988-1.681-5.857-1.22-1.568-3.153-3.923-4.723-4.508-1.33-.499-1.964 2.474-1.76 2.4h.89l.172.084c-1.833.925-3.251 3.802-3.394 4.812-.145 1.1.063 1.91 2.693 2.586l1.057.311c-2.194 2.598-6.283 5.285-9.07 7.19-3.952 2.71-9.561 6.095-11.158 7.073-1.597.972-1.463 1.279-.844 1.04m23.754-19.089.142-1.299c1.849 2.107 3.221 4.614 3.084 4.969-.849.068-1.906-.717-3.755-1.507a15.88 15.88 0 0 0 .529-2.163m-5.309.003c-.01-.395.701-1.494 2.208-2.095 1.504-.605 2.17 1.084 2.3 3.14l-.446.824-1.356-.469c-1.435-.42-2.405-.658-2.706-1.4" fill="#fff"/><path d="M455.813 216.326c2.169-1.433 8.132-5.738 11.515-8.56 2.352-1.96 5.116-4.846 6.992-7.288a89.775 89.775 0 0 0 3.276 2.026c1.929 1.127 2.704 2.799 2.704 2.799.356-.547 2.016-3.54 1.367-4.997-.39-.476-2.761-1.861-5.185-3.345 1.23-2.76 2.922-7.534.498-9.205-2.073-1.419-5.571.929-7.19 3.975-1.337 2.523-1.51 4.663 1.04 6.415.718.494 1.406.96 2.08 1.403-2.572 2.814-7.31 6.977-10.683 9.81-4.188 3.505-8.148 6.942-8.839 7.762l-.2.32c-.914-2.548-.665-4.12-1.344-3.275-2.934 4.601.742 8.33 2.079 12.052-1.808 1.64-4.577.134-5.506-1.302-1.978-2.973-1.317-9.01-3.632-9.945-.597 1.631-.986 3.447-.986 3.447s1.761 4.135 1.315 6.865c-.277 1.652-1.74 3.584-3.66 3.617-5.138.131-2.605-7.47-4.588-11.776-.402 1.056-.69 2.185-1.172 3.163.364 1.132.564 2.702.616 3.611.132 1.806-.016 3.743.288 5.293.424 2.178 1.635 3.626 3.484 3.76 3.832.312 5.582-2.803 6.163-5.343.66 2.598 5.736 5.455 8.23 2.27 3.307-4.212.66-7.818-1.03-11.78l-.199-.513c.236.083 1.12-.304 2.567-1.259m14.988-23.713c1.27-2.358 3.947-2.558 4.75-1.322.637.982.69 2.9-.27 4.923-2.36-1.482-4.467-2.933-4.48-3.601" fill="#fff"/><path d="M372.161 201.334c-4.514-.32-6.943-4.455-8.332-10.429-1.391-5.974-.54-13.852-.162-15.87.378-2.016-1.75-.975-2.577 3.92-.822 4.89-1.649 12.71 1.263 20.897 2.906 8.177 7.86 11.229 12.202 10.183 4.342-1.04 8.163-11.229 9.51-15.8 1.345-4.573 7.363-23.224 10.77-24.227.477 2.287-2.648 8.022-3.648 16.645-.994 8.623.737 19.933 11.682 21.939 10.945 2.008 18.371-5.093 21.064-10.029 2.695-4.928 3.952-10.11 4.256-12.712.35 6.617 4.865 16.949 13.632 19.894 8.472 2.847 14.945.24 17.804-3.449 2.54-3.277 4.608-10.026 4.786-15.202.172-5.171-4.298-14.635-5.298-17.648-1.002-3.006-1.52-5.093-1.608-6.134-.085-1.04 2.263 1.206 3.74 1.646.999.2.648-1.965-.568-3.452-1.213-1.481-7.782-11.44-8.242-10.747-.282.415-2.911 7.742-3.084 8.863 1.041.684 2.246 2.568 2.337 4.374.082 1.805 1.821 9.745 3.429 14.156s4.733 12.875 4.952 15.202c-3.125 2.203-10.165 5.007-16.85 2.165-6.687-2.851-8.82-6.982-9.557-14.361-.471-4.715-.518-13.402-2.2-20.664-.947-4.106-2.944-8.279-5.316-10.495-.56 1.36-3.079 9.745-3.079 9.745.822 2.406 3.377 10.507 3.295 17.527-.09 7.015-.644 13.88-8.51 18.61-7.861 4.731-19.061 2.847-21.973-4.535-2.912-7.38 3.56-23.982 3.476-28.353-.088-4.37-.874-4.976-2.695-4.252-1.825.722-5.564 4.936-8.774 11.791-3.215 6.86-4.642 13.716-6.472 19.492-1.822 5.776-4.739 11.629-9.253 11.31M241.095 175.748c5.555-.403 10.25-4.615 11.463-5.734 1.216-1.127 1.87-2.806 1-2.168-6.426 5.736-15.024 5.898-15.506 4.934.219-.963 2.481-2.528 5.782-4.731 2.005-1.34 3.791-2.596 5.128-4.376l.364.063c2.446.537 5.27 1.606 6.133.75 1.405-1.385 1.591-3.654.068-6.1-1.287-2.077-4.29-4.01-6.897-5.405-2.602-1.388-3.106.828-3.44 1.618-.32.737-.19 1.365.361 1.38-.838 1.143-1.435 2.614-1.654 3.83-.142.785-.027 1.428.293 1.957.093.15.575.74 1.487 1.089l1.132.352c-1.948 1.798-4.191 3.206-5.369 3.918-2.125 1.284-4.645 3.53-5.426 5.852-.783 2.33-.48 3.173 5.081 2.77m9.82-16.384.213-1.185v-.76c1.761 1.281 4.577 3.707 4.405 5.161-1.115-.253-3.24-.702-5.26-1.22.258-.606.469-1.27.642-1.996m-5.221.37c-1.296-1.034-.033-2.064 1.115-2.728 1.482-.856 2.35-.15 3.109 2.097a9.096 9.096 0 0 1-1.077 1.869c-1.153-.357-2.777-.93-3.147-1.238M257.76 238.481c-1.597 1.385-2.216 5.893-1.89 6.164.323.271 5.314 1.955 6.094 2.32l.357-1.358c2.377 2.135 5.012 12.787 5.598 12.817.586.028 1.436-1.205 1.992-4.034.512-2.624 1.024-6.549 1.558-9.745.499-2.925 1.274-4.599 3.032-4.933 1.761-.33 3.065 1.927 3.52 3.462 0 0 1.235-2.95 1.498-4.784-.293-.965-3.032-4.601-5.278-3.398-2.249 1.205-3.657 6.308-4.111 9.499-.458 3.185-.808 7.136-1.362 7.77-.58-2.72-2.44-7.588-4.686-10.323-2.526-3.064-5.478-4.189-6.322-3.457M236.471 233.036c2.085-.572 6.777-1.291 9.023-2.464 2.117-.992 5.73-5.834 7.132-7.64 1.4-1.806 1.403-2.712 1.047-3.19-1.433-.786-10.688-1.563-15.153-.457-1.233.833-3.646 5.298-4.002 6.233-.361.929.132.87 1.627.541 1.499-.334 8.601-.154 11.17.388-1.07.755-8.335 4.424-9.77 5.298-1.43.87-1.791 1.382-1.074 1.291M666.787 258.885c-.213-5.412-2.865-13.72-12.944-26.469-3.479-4.401-8.374-10.13-13.537-15.997-.142-2-.285-3.829-.413-5.4-.677-8.075-2.97-24.55-3.956-34.29-.24-2.457-.26-5.07-.224-6.435.035-1.084.816-.94 1.89.174 1.073 1.112 2.728 2.735 3.073 2.624.734-.253.096-2.712-1.37-5.627-1.462-2.92-6.992-14.729-8.009-15.187-.523-.233-3.13 6.7-3.292 8.119.518.871 1.854 2.226 1.983 6.169.137 3.94 2.514 27.213 3.881 41.878l.074.818c-7.718-8.617-14.988-16.475-17.979-19.661-.518-.552-1.087-1.18-1.701-1.854-.488-3.923-.937-7.66-1.246-10.748a52.793 52.793 0 0 1-.225-6.434c.025-1.082.81-.935 1.885.18 1.079 1.111 2.728 2.734 3.073 2.618.734-.248.096-2.707-1.372-5.627-1.46-2.92-7.226-15-8.248-15.458-.517-.233-3.246 7.253-3.407 8.66.523.877 1.857 2.232 1.988 6.175.052 1.674.488 6.749 1.069 13.153-5.117-6.08-10.127-12.447-10.483-13.74-.126-.639.956-.246 2.958.078 1.994.319 3.865.92 3.545-.068-.15-.459-.912-1.604-2.822-2.789-1.911-1.182-6.809-4.247-10.452-6.41-3.651-2.164-5.459-3.985-6.212-3.466-.373.256-.041 7.678.173 8.597.917.084 2.613.765 3.692 2.209 1.09 1.443 8.07 11.228 13.588 17.846a976.143 976.143 0 0 0 6.988 8.265c.57 6.096 1.167 12.394 1.66 17.656 1.12 12.004 5.146 43.662 5.185 53.95-2.972 2.79-9.05 6.679-15.304 6.76-6.253.078-9.682-1.568-12.202-6.217-.778-1.441-1.501-2.89-2.219-4.201-1.703-3.118-5.505-4.868-9.17-4.01l-.559.15-.997.479c-2.482 1.299-5.048 3.477-7.557 6.855-4.339 5.86-7.11 12.216-10.32 17.722-3.345 5.733-5.912 9.58-11.779 8.66-4.13-.648-7.267-4.19-9.2-8.549 5.431-3.758 9.375-8.66 12.26-15.455 3.755-8.83 5.094-18.785 4.76-29.979-.32-10.535-5.122-35.32-6.39-44.818-1.266-9.504-3.084-17.304-2.873-19.333.197-1.957 3.314 2.652 4.91 2.996.817-.182.379-3.122-1.172-5.607-1.051-1.689-4.382-9.372-6.562-13.077-1.025-1.753-1.271-2.768-1.748-2.976-.471-.215-4.1 7.537-3.662 8.38 1.074 1.535 1.808 2.267 2.032 5.017.23 2.75 2.717 22.938 4.892 37.806 1.638 11.219 5.257 31.597 5.722 46.66.154 4.915-.548 8.443-1.156 10.413-1.561 3.019-4.106 6.372-13.046 12.736-1.38-8.993.12-16.299-1.189-16.975-1.476.16-1.712 4.35-1.879 9.522-.082 2.388.022 5.695.471 9.248-10.98 7.34-25.487 14.022-32.299 17.59-3.996 2.097-2.555 2.586.827 1.54 3.383-1.051 21.973-5.926 31.897-11.145l1.068-.593c.504 1.75 1.115 3.444 1.866 5.007 3.338 6.939 8.11 11.059 13.279 10.656 4.347-.334 7.5-4.986 10.25-10.535 2.78-5.616 7.477-16.283 12.084-20.251 1.77-1.53 3.6-2.74 5.38-3.467 0 0 3.147-1.051 6.042.84 1.038.684 1.813 1.657 2.304 2.746 1.142 2.5 2.492 5.68 5.253 8.344 4.865 4.685 12.687 3.718 18.555.993 5.858-2.728 8.85-6.982 10.153-12.037 2.224-8.648 1.868-17.509 1.444-25.38-.49-8.982-1.926-18.162-2.742-27.89-.263-3.127-.775-7.477-1.364-12.195 5.714 6.594 11.646 13.287 15.246 16.947 1.24 1.263 2.55 2.666 3.895 4.148 1.073 14.723 2.106 33.147 2.651 40.878.54 7.704.192 17.388.129 19.072-.066 1.684.87 1.395 2.216-2.343 1.802-5.017 2.933-18.173 2.539-26.897-.236-5.184-.753-14.634-1.312-23.574a402.649 402.649 0 0 1 11.383 14.182c4.87 6.376 9.343 13.958 10.907 18.689 1.562 4.735 1.734 6.138 2.038 6.982s1.65-2.611 1.436-8.023M584.55 439.013c-.44-1.259-1.787-2.182-3.398-2.182s-2.955.923-3.398 2.182H562.5a13.645 13.645 0 0 1 .476-5.05l31.493-.019.877 1.478a15.722 15.722 0 0 0 2.952 3.59zm20.848-14.635h-37.845c2.909-2.1 4.434-5.162 4.025-8.261-.261-1.953-2.196-3.412-4.555-3.61h-1.185c-2.87.28-4.951 2.349-4.648 4.62l.115.874.14 1.344a13.631 13.631 0 0 1-.47 5.033H281.236c4.154 6.044 11.728 9.75 19.906 9.744l255.266-.157c-2.92 2.102-4.45 5.17-4.038 8.275.302 2.272 2.87 3.89 5.74 3.61 2.867-.28 4.948-2.349 4.649-4.624l-.116-.87h15.002c.264 1.464 1.726 2.587 3.507 2.587s3.244-1.123 3.51-2.588h15.26v-.035c3.187 2.26 7.236 3.56 11.52 3.56 4.03 0 7.295-2.8 7.295-6.255v-1.808c0-6.316-5.97-11.44-13.338-11.44" fill="#fff"/></svg>'
  }
];
class LocaleEntity {
  constructor(data) {
    this.data = data;
  }
  // Returns the human-readable name of the locale
  getName() {
    return this.data.name;
  }
  // Returns the locale code
  getCode() {
    return this.data.code;
  }
  // Returns the text direction
  getDir() {
    return this.data.dir;
  }
  /**
   * Returns the SVG flag with custom width and height.
   * It replaces any existing width/height attributes in the SVG with the provided values.
   */
  getSvgFlag(width, height) {
    return this.data.flag.replace(/\swidth="[^"]*"/, ` width="${width}"`).replace(/\sheight="[^"]*"/, ` height="${height}"`);
  }
}
class Locales {
  /**
   * Initializes the Locales manager.
   * - Converts LocaleEntityData array into LocaleEntity instances.
   * - Sets the initial current locale based on document language or falls back to the first locale.
   */
  constructor(supportedLocales2) {
    this.supportedLocales = supportedLocales2;
    this.locales = supportedLocales2.map((locale) => new LocaleEntity(locale));
    const lang = typeof document !== "undefined" ? document.documentElement.lang : "";
    const found = this.locales.find((locale) => locale.getCode() === lang);
    this.currentLocale = found || this.locales[0];
  }
  // Returns all available locales
  get() {
    return this.locales;
  }
  // Returns the current active locale
  current() {
    return this.currentLocale;
  }
  /**
   * Sets the active locale to the one matching the provided language code.
   * - If the locale is found, it is set as the current locale.
   * - If not, it logs a warning and keeps the current locale unchanged.
   */
  setLocale(lang) {
    const locale = this.locales.find((locale2) => locale2.getCode() === lang);
    if (locale) {
      this.currentLocale = locale;
      router.get(route("locale.change", locale.getCode()));
      loadLanguageAsync(locale.getCode());
      Validator.useLang(locale.getCode());
      if (typeof document !== "undefined") {
        document.documentElement.lang = locale.getCode();
        document.documentElement.dir = locale.getDir();
      }
    } else {
      console.warn(`Locale "${lang}" not found. Keeping current locale.`);
    }
    return this;
  }
  // Checks whether a locale with the given language code exists
  has(lang) {
    return this.locales.some((locale) => locale.getCode() === lang);
  }
  // Returns the LocaleEntity matching the given language code, or undefined if not found
  getByCode(lang) {
    return this.locales.find((locale) => locale.getCode() === lang);
  }
}
let locales = new Locales(supportedLocales);
let Locale = locales.current();
const defaultOptions = {
  autoClose: 3e3,
  position: toast.POSITION.TOP_LEFT,
  rtl: true,
  type: "success"
};
const toastWithDefaults = (message, options = {}) => {
  const mergedOptions = { ...defaultOptions, ...options };
  return toast(message, mergedOptions);
};
toastWithDefaults.success = (message, options = {}) => {
  const mergedOptions = { ...defaultOptions, ...options, type: "success" };
  return toast.success(message, mergedOptions);
};
toastWithDefaults.error = (message, options = {}) => {
  const mergedOptions = { ...defaultOptions, ...options, type: "error" };
  return toast.error(message, mergedOptions);
};
toastWithDefaults.info = (message, options = {}) => {
  const mergedOptions = { ...defaultOptions, ...options, type: "info" };
  return toast.info(message, mergedOptions);
};
toastWithDefaults.warning = (message, options = {}) => {
  const mergedOptions = { ...defaultOptions, ...options, type: "warning" };
  return toast.warning(message, mergedOptions);
};
toastWithDefaults.POSITION = toast.POSITION;
Validator.setMessages("ar", ar);
Validator.setMessages("en", en);
Validator.useLang(Locale.getCode());
function useForm(initialData) {
  const form = useForm$1({
    ...initialData,
    errors: {},
    touched: {}
  });
  const originalPost = form.post.bind(form);
  const originalPut = form.put.bind(form);
  const originalPatch = form.patch.bind(form);
  const originalDelete = form.delete.bind(form);
  function handleErrors(errors) {
    console.error("[Global Inertia Error]", errors);
    if (Object.keys(errors).length) {
      const errorList = Object.values(errors).join("\n");
      toastWithDefaults.error(errorList);
    }
  }
  form.post = (url, options = {}) => originalPost(url, {
    ...options,
    onError: (errors) => {
      if (options.showErrorsToast) {
        handleErrors(errors);
      }
      options.onError?.(errors);
    }
  });
  form.put = (url, options = {}) => originalPut(url, {
    ...options,
    onError: (errors) => {
      if (options.showErrorsToast) {
        handleErrors(errors);
      }
      options.onError?.(errors);
    }
  });
  form.patch = (url, options = {}) => originalPatch(url, {
    ...options,
    onError: (errors) => {
      if (options.showErrorsToast) {
        handleErrors(errors);
      }
      options.onError?.(errors);
    }
  });
  form.delete = (url, options = {}) => originalDelete(url, {
    ...options,
    onError: (errors) => {
      if (options.showErrorsToast) {
        handleErrors(errors);
      }
      options.onError?.(errors);
    }
  });
  form.validate = (rules, messages = {}) => {
    const validator = new Validator(form.data(), rules, messages);
    if (validator.fails()) {
      form.errors = {};
      for (const field in validator.errors.all()) {
        form.errors[field] = validator.errors.first(field);
      }
    } else {
      form.errors = {};
    }
    Object.keys(rules).forEach((field) => {
      watch(
        () => form[field],
        () => {
          if (form.errors?.[field]) {
            const fieldData = { [field]: form[field] };
            const fieldRule = { [field]: rules[field] };
            const fieldValidator = new Validator(fieldData, fieldRule, messages);
            if (fieldValidator.fails()) {
              form.errors[field] = fieldValidator.errors.first(field);
            } else {
              delete form.errors[field];
            }
          }
        }
      );
    });
    return validator;
  };
  return form;
}
const __vite_glob_0_0 = "/build/assets/core-dark-DDiK0JY9.css";
const __vite_glob_0_1$1 = "/build/assets/core-BYUzetZq.css";
const __vite_glob_0_2$1 = "/build/assets/theme-bordered-dark-Cy2BfozZ.css";
const __vite_glob_0_3$1 = "/build/assets/theme-bordered-BQhxUDw1.css";
const __vite_glob_0_4$1 = "/build/assets/theme-default-dark-BD91TPYn.css";
const __vite_glob_0_5$1 = "/build/assets/theme-default-b4iX8O4u.css";
const __vite_glob_0_6$1 = "/build/assets/theme-raspberry-dark-Obso24AM.css";
const __vite_glob_0_7$1 = "/build/assets/theme-raspberry-Ik-vYRDR.css";
const __vite_glob_0_8$1 = "/build/assets/theme-semi-dark-dark-DJGN76ff.css";
const __vite_glob_0_9$1 = "/build/assets/theme-semi-dark-CU0FnSij.css";
function useTheme() {
  const theme = ref("light");
  const pageLoaded = ref(false);
  function resolveMode(mode) {
    if (mode === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return mode;
  }
  function applyTheme(mode) {
    pageLoaded.value = false;
    const resolved = resolveMode(mode);
    const html = document.documentElement;
    html.setAttribute("data-mode", resolved);
    localStorage.setItem("theme", mode);
    theme.value = mode;
    document.querySelectorAll("link[data-theme-style]").forEach((link) => link.remove());
    const themeStyles = /* @__PURE__ */ Object.assign({
      "/resources/templates/sneat/assets/vendor/css/rtl/core-dark.css": __vite_glob_0_0,
      "/resources/templates/sneat/assets/vendor/css/rtl/core.css": __vite_glob_0_1$1,
      "/resources/templates/sneat/assets/vendor/css/rtl/theme-bordered-dark.css": __vite_glob_0_2$1,
      "/resources/templates/sneat/assets/vendor/css/rtl/theme-bordered.css": __vite_glob_0_3$1,
      "/resources/templates/sneat/assets/vendor/css/rtl/theme-default-dark.css": __vite_glob_0_4$1,
      "/resources/templates/sneat/assets/vendor/css/rtl/theme-default.css": __vite_glob_0_5$1,
      "/resources/templates/sneat/assets/vendor/css/rtl/theme-raspberry-dark.css": __vite_glob_0_6$1,
      "/resources/templates/sneat/assets/vendor/css/rtl/theme-raspberry.css": __vite_glob_0_7$1,
      "/resources/templates/sneat/assets/vendor/css/rtl/theme-semi-dark-dark.css": __vite_glob_0_8$1,
      "/resources/templates/sneat/assets/vendor/css/rtl/theme-semi-dark.css": __vite_glob_0_9$1
    });
    const styles = resolved === "dark" ? [themeStyles["/resources/templates/sneat/assets/vendor/css/rtl/core-dark.css"], themeStyles["/resources/templates/sneat/assets/vendor/css/rtl/theme-default-dark.css"]] : [];
    for (const href of styles) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.dataset.themeStyle = resolved;
      document.head.appendChild(link);
    }
    html.classList.remove("light-style");
    html.classList.remove("dark-style");
    html.classList.add(resolved + "-style");
    pageLoaded.value = true;
  }
  onMounted(() => {
    const saved = localStorage.getItem("theme") || "system";
    theme.value = saved;
    applyTheme(saved);
  });
  return { theme, applyTheme, resolveMode, pageLoaded };
}
const _sfc_main$s = {
  __name: "StyleSwitcher",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme } = useTheme();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-v-57dc0ec7>`);
      if (unref(theme) === "light") {
        _push(`<i class="bx bx-sun bx-sm" data-v-57dc0ec7></i>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(theme) === "dark") {
        _push(`<i class="bx bx-moon bx-sm" data-v-57dc0ec7></i>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(theme) === "system") {
        _push(`<i class="bx bx-desktop bx-sm" data-v-57dc0ec7></i>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button><ul class="dropdown-menu" data-v-57dc0ec7><li data-v-57dc0ec7><a class="${ssrRenderClass([{ active: unref(theme) === "light" }, "dropdown-item"])}" href="javascript:void(0);" data-v-57dc0ec7><span class="align-middle" data-v-57dc0ec7><i class="bx bx-sun me-2" data-v-57dc0ec7></i>${ssrInterpolate(_ctx.$t("actions.mode.light"))}</span></a></li><li data-v-57dc0ec7><a class="${ssrRenderClass([{ active: unref(theme) === "dark" }, "dropdown-item"])}" href="javascript:void(0);" data-v-57dc0ec7><span class="align-middle" data-v-57dc0ec7><i class="bx bx-moon me-2" data-v-57dc0ec7></i>${ssrInterpolate(_ctx.$t("actions.mode.dark"))}</span></a></li><li data-v-57dc0ec7><a class="${ssrRenderClass([{ active: unref(theme) === "system" }, "dropdown-item"])}" href="javascript:void(0);" data-v-57dc0ec7><span class="align-middle" data-v-57dc0ec7><i class="bx bx-desktop me-2" data-v-57dc0ec7></i>${ssrInterpolate(_ctx.$t("actions.mode.system"))}</span></a></li></ul><!--]-->`);
    };
  }
};
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Guest/StyleSwitcher.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const StyleSwitcher = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__scopeId", "data-v-57dc0ec7"]]);
const _sfc_main$r = /* @__PURE__ */ Object.assign({
  name: "ConfirmPassword",
  layout: Guest
}, {
  __name: "ConfirmPassword",
  __ssrInlineRender: true,
  props: ["app", "config"],
  setup(__props) {
    const locales2 = inject("$locales");
    const form = useForm({
      password: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(_ctx.$t("auth.confirm_password.page_title"))} | ${ssrInterpolate(__props.app.name)}</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(_ctx.$t("auth.confirm_password.page_title")) + " | " + toDisplayString(__props.app.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="authentication-inner row m-0"><div class="d-none d-lg-flex col-lg-7 col-xl-8 align-items-center p-5"><div class="w-100 d-flex justify-content-center"><img${ssrRenderAttr("src", __props.config.banner)} class="img-fluid" alt="Confirm Password image" width="700"></div></div><div class="d-flex col-12 col-lg-5 col-xl-4 align-items-center authentication-bg p-sm-5 p-4"><div class="w-px-400 mx-auto"><div class="app-brand mb-5">`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(route)("dashboard.home"),
        class: "app-brand-link gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.app.logo) {
              _push2(`<span class="app-brand-logo demo"${_scopeId}><img${ssrRenderAttr("src", __props.app.logo)} class="mw-100" style="${ssrRenderStyle({ "height": "60px" })}"${ssrRenderAttr("alt", __props.app.name)}${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span class="app-brand-text demo text-body fw-bold text-uppercase"${_scopeId}>${ssrInterpolate(__props.app.name)}</span>`);
          } else {
            return [
              __props.app.logo ? (openBlock(), createBlock("span", {
                key: 0,
                class: "app-brand-logo demo"
              }, [
                createVNode("img", {
                  src: __props.app.logo,
                  class: "mw-100",
                  style: { "height": "60px" },
                  alt: __props.app.name
                }, null, 8, ["src", "alt"])
              ])) : createCommentVNode("", true),
              createVNode("span", { class: "app-brand-text demo text-body fw-bold text-uppercase" }, toDisplayString(__props.app.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><h4 class="mb-2">${ssrInterpolate(_ctx.$t("auth.confirm_password.title", { app: __props.app.name }))}</h4><p class="mb-4">${ssrInterpolate(_ctx.$t("auth.confirm_password.subtitle"))}</p><form id="formAuthentication" class="mb-3" action="" method="POST">`);
      _push(ssrRenderComponent(_sfc_main$u, {
        resource: "auth.confirm_password",
        type: "password",
        name: "password",
        modelValue: unref(form).password,
        "onUpdate:modelValue": ($event) => unref(form).password = $event,
        error: unref(form).errors.password
      }, null, _parent));
      _push(`<button type="submit" class="btn btn-primary d-grid w-100"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}>${ssrInterpolate(_ctx.$t("auth.confirm_password.actions.submit"))}</button></form><p class="text-center"><!--[-->`);
      ssrRenderList(unref(locales2).get(), (locale) => {
        _push(`<!--[-->`);
        if (unref(locales2).current().getCode() === locale.getCode()) {
          _push(`<span class="text-muted d-inline-block me-2"><span class="me-1">${locale.getSvgFlag(20, 20) ?? ""}</span> ${ssrInterpolate(locale.getName())}</span>`);
        } else {
          _push(`<a class="d-inline-block me-2"${ssrRenderAttr("href", unref(route)("locale.change", locale.getCode()))}><span class="me-1">${locale.getSvgFlag(20, 20) ?? ""}</span> ${ssrInterpolate(locale.getName())}</a>`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></p><div class="text-center">`);
      _push(ssrRenderComponent(StyleSwitcher, null, null, _parent));
      _push(`</div></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Auth/ConfirmPassword.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$r
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$q = /* @__PURE__ */ Object.assign({
  name: "ForgetPassword",
  layout: Guest
}, {
  __name: "ForgetPassword",
  __ssrInlineRender: true,
  props: ["app", "config", "flash"],
  setup(__props) {
    const locales2 = inject("$locales");
    const form = useForm({
      email: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(_ctx.$t("auth.forget_password.page_title"))} | ${ssrInterpolate(__props.app.name)}</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(_ctx.$t("auth.forget_password.page_title")) + " | " + toDisplayString(__props.app.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="authentication-inner row m-0"><div class="d-none d-lg-flex col-lg-7 col-xl-8 align-items-center p-5"><div class="w-100 d-flex justify-content-center"><img${ssrRenderAttr("src", __props.config.banner)} class="img-fluid" alt="Forget Password image" width="700"></div></div><div class="d-flex col-12 col-lg-5 col-xl-4 align-items-center authentication-bg p-sm-5 p-4"><div class="w-px-400 mx-auto"><div class="app-brand mb-5">`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(route)("dashboard.home"),
        class: "app-brand-link gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.app.logo) {
              _push2(`<span class="app-brand-logo demo"${_scopeId}><img${ssrRenderAttr("src", __props.app.logo)} class="mw-100" style="${ssrRenderStyle({ "height": "60px" })}"${ssrRenderAttr("alt", __props.app.name)}${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span class="app-brand-text demo text-body fw-bold text-uppercase"${_scopeId}>${ssrInterpolate(__props.app.name)}</span>`);
          } else {
            return [
              __props.app.logo ? (openBlock(), createBlock("span", {
                key: 0,
                class: "app-brand-logo demo"
              }, [
                createVNode("img", {
                  src: __props.app.logo,
                  class: "mw-100",
                  style: { "height": "60px" },
                  alt: __props.app.name
                }, null, 8, ["src", "alt"])
              ])) : createCommentVNode("", true),
              createVNode("span", { class: "app-brand-text demo text-body fw-bold text-uppercase" }, toDisplayString(__props.app.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><h4 class="mb-2">${ssrInterpolate(_ctx.$t("auth.forget_password.title", { app: __props.app.name }))}</h4><p class="mb-4">${ssrInterpolate(_ctx.$t("auth.forget_password.subtitle"))}</p><form id="formAuthentication" class="mb-3" action="" method="POST">`);
      _push(ssrRenderComponent(_sfc_main$u, {
        resource: "auth.forget_password",
        type: "text",
        name: "email",
        modelValue: unref(form).email,
        "onUpdate:modelValue": ($event) => unref(form).email = $event,
        autofocus: "",
        error: unref(form).errors.email
      }, null, _parent));
      _push(`<button type="submit" class="btn btn-primary d-grid w-100"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}>${ssrInterpolate(_ctx.$t("auth.forget_password.actions.submit"))}</button></form><p class="text-center">`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(route)("login")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>${ssrInterpolate(_ctx.$t("auth.forget_password.actions.login"))}</span>`);
          } else {
            return [
              createVNode("span", null, toDisplayString(_ctx.$t("auth.forget_password.actions.login")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p><p class="text-center"><!--[-->`);
      ssrRenderList(unref(locales2).get(), (locale) => {
        _push(`<!--[-->`);
        if (unref(locales2).current().getCode() === locale.getCode()) {
          _push(`<span class="text-muted d-inline-block me-2"><span class="me-1">${locale.getSvgFlag(20, 20) ?? ""}</span> ${ssrInterpolate(locale.getName())}</span>`);
        } else {
          _push(`<a class="d-inline-block me-2"${ssrRenderAttr("href", unref(route)("locale.change", locale.getCode()))}><span class="me-1">${locale.getSvgFlag(20, 20) ?? ""}</span> ${ssrInterpolate(locale.getName())}</a>`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></p><div class="text-center">`);
      _push(ssrRenderComponent(StyleSwitcher, null, null, _parent));
      _push(`</div></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Auth/ForgetPassword.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$q
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$p = /* @__PURE__ */ Object.assign({
  name: "Login",
  layout: Guest
}, {
  __name: "Login",
  __ssrInlineRender: true,
  props: ["app", "config"],
  setup(__props) {
    const locales2 = inject("$locales");
    const form = useForm({
      email: "",
      password: "",
      remember: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(_ctx.$t("auth.login.page_title"))} | ${ssrInterpolate(__props.app.name)}</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(_ctx.$t("auth.login.page_title")) + " | " + toDisplayString(__props.app.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="authentication-inner row m-0"><div class="d-none d-lg-flex col-lg-7 col-xl-8 align-items-center p-5"><div class="w-100 d-flex justify-content-center"><img${ssrRenderAttr("src", __props.config.banner)} class="img-fluid" alt="Login image" width="700"></div></div><div class="d-flex col-12 col-lg-5 col-xl-4 align-items-center authentication-bg p-sm-5 p-4"><div class="w-px-400 mx-auto"><div class="app-brand mb-5">`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(route)("dashboard.home"),
        class: "app-brand-link gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.app.logo) {
              _push2(`<span class="app-brand-logo demo"${_scopeId}><img${ssrRenderAttr("src", __props.app.logo)} class="mw-100" style="${ssrRenderStyle({ "height": "60px" })}"${ssrRenderAttr("alt", __props.app.name)}${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span class="app-brand-text demo text-body fw-bold text-uppercase"${_scopeId}>${ssrInterpolate(__props.app.name)}</span>`);
          } else {
            return [
              __props.app.logo ? (openBlock(), createBlock("span", {
                key: 0,
                class: "app-brand-logo demo"
              }, [
                createVNode("img", {
                  src: __props.app.logo,
                  class: "mw-100",
                  style: { "height": "60px" },
                  alt: __props.app.name
                }, null, 8, ["src", "alt"])
              ])) : createCommentVNode("", true),
              createVNode("span", { class: "app-brand-text demo text-body fw-bold text-uppercase" }, toDisplayString(__props.app.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><h4 class="mb-2">${ssrInterpolate(_ctx.$t("auth.login.title", { app: __props.app.name }))}</h4><p class="mb-4">${ssrInterpolate(_ctx.$t("auth.login.subtitle"))}</p><form id="formAuthentication" class="mb-3" action="" method="POST">`);
      _push(ssrRenderComponent(_sfc_main$u, {
        resource: "auth.login",
        type: "text",
        name: "email",
        modelValue: unref(form).email,
        "onUpdate:modelValue": ($event) => unref(form).email = $event,
        autofocus: "",
        error: unref(form).errors.email
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$u, {
        resource: "auth.login",
        type: "password",
        name: "password",
        modelValue: unref(form).password,
        "onUpdate:modelValue": ($event) => unref(form).password = $event,
        error: unref(form).errors.password
      }, {
        label: withCtx(({ label }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="d-flex justify-content-between"${_scopeId}><label class="form-label" for="password"${_scopeId}>${ssrInterpolate(label)}</label>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("password.request")
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<small${_scopeId2}>${ssrInterpolate(_ctx.$t("auth.login.actions.forget"))}</small>`);
                } else {
                  return [
                    createVNode("small", null, toDisplayString(_ctx.$t("auth.login.actions.forget")), 1)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "d-flex justify-content-between" }, [
                createVNode("label", {
                  class: "form-label",
                  for: "password"
                }, toDisplayString(label), 1),
                createVNode(unref(Link), {
                  href: unref(route)("password.request")
                }, {
                  default: withCtx(() => [
                    createVNode("small", null, toDisplayString(_ctx.$t("auth.login.actions.forget")), 1)
                  ]),
                  _: 1
                }, 8, ["href"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$t, {
        resource: "auth.login",
        name: "remember",
        modelValue: unref(form).remember,
        "onUpdate:modelValue": ($event) => unref(form).remember = $event,
        error: unref(form).errors.remember
      }, null, _parent));
      _push(`<button type="submit" class="btn btn-primary d-grid w-100"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}>${ssrInterpolate(_ctx.$t("auth.login.actions.submit"))}</button></form>`);
      if (__props.config.register) {
        _push(`<p class="text-center"><span>${ssrInterpolate(_ctx.$t("auth.login.actions.register-note"))}  </span>`);
        _push(ssrRenderComponent(unref(Link), {
          href: unref(route)("register")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span${_scopeId}>${ssrInterpolate(_ctx.$t("auth.login.actions.register"))}</span>`);
            } else {
              return [
                createVNode("span", null, toDisplayString(_ctx.$t("auth.login.actions.register")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="text-center"><!--[-->`);
      ssrRenderList(unref(locales2).get(), (locale) => {
        _push(`<!--[-->`);
        if (unref(locales2).current().getCode() === locale.getCode()) {
          _push(`<span class="text-muted d-inline-block me-2"><span class="me-1">${locale.getSvgFlag(20, 20) ?? ""}</span> ${ssrInterpolate(locale.getName())}</span>`);
        } else {
          _push(`<a class="d-inline-block me-2"${ssrRenderAttr("href", unref(route)("locale.change", locale.getCode()))}><span class="me-1">${locale.getSvgFlag(20, 20) ?? ""}</span> ${ssrInterpolate(locale.getName())}</a>`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></p><div class="text-center">`);
      _push(ssrRenderComponent(StyleSwitcher, null, null, _parent));
      _push(`</div></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Auth/Login.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$p
}, Symbol.toStringTag, { value: "Module" }));
const countriesData = [
  {
    "name_en": "Aruba",
    "name_ar": "أروبا",
    "code": "AW",
    "flag": "🇦🇼",
    "dial_code": "+297",
    "phone_placeholder": "5XX XXXX",
    "max_digits": 7,
    "prefix": "5"
  },
  {
    "name_en": "Afghanistan",
    "name_ar": "أفغانستان",
    "code": "AF",
    "flag": "🇦🇫",
    "dial_code": "+93",
    "phone_placeholder": "7X XXX XXXX",
    "max_digits": 9,
    "prefix": "7"
  },
  {
    "name_en": "Angola",
    "name_ar": "أنغولا",
    "code": "AO",
    "flag": "🇦🇴",
    "dial_code": "+244",
    "phone_placeholder": "9XX XXX XXX",
    "max_digits": 9,
    "prefix": "9"
  },
  {
    "name_en": "Anguilla",
    "name_ar": "أنغويلا",
    "code": "AI",
    "flag": "🇦🇮",
    "dial_code": "+1",
    "phone_placeholder": "264 XXX XXXX",
    "max_digits": 10,
    "prefix": "264"
  },
  {
    "name_en": "Åland Islands",
    "name_ar": "جزر أولاند",
    "code": "AX",
    "flag": "🇦🇽",
    "dial_code": "+358",
    "phone_placeholder": "18 XXX XXX",
    "max_digits": 8,
    "prefix": "18"
  },
  {
    "name_en": "Albania",
    "name_ar": "ألبانيا",
    "code": "AL",
    "flag": "🇦🇱",
    "dial_code": "+355",
    "phone_placeholder": "6X XXX XXXX",
    "max_digits": 9,
    "prefix": "6"
  },
  {
    "name_en": "Andorra",
    "name_ar": "أندورا",
    "code": "AD",
    "flag": "🇦🇩",
    "dial_code": "+376",
    "phone_placeholder": "XXX XXX",
    "max_digits": 6,
    "prefix": ""
  },
  {
    "name_en": "United Arab Emirates",
    "name_ar": "الإمارات العربية المتحدة",
    "code": "AE",
    "flag": "🇦🇪",
    "dial_code": "+971",
    "phone_placeholder": "5X XXX XXXX",
    "max_digits": 9,
    "prefix": "5"
  },
  {
    "name_en": "Argentina",
    "name_ar": "الأرجنتين",
    "code": "AR",
    "flag": "🇦🇷",
    "dial_code": "+54",
    "phone_placeholder": "9 11 XXXX XXXX",
    "max_digits": 11,
    "prefix": "9"
  },
  {
    "name_en": "Armenia",
    "name_ar": "أرمينيا",
    "code": "AM",
    "flag": "🇦🇲",
    "dial_code": "+374",
    "phone_placeholder": "9X XXX XXX",
    "max_digits": 8,
    "prefix": "9"
  },
  {
    "name_en": "American Samoa",
    "name_ar": "ساموا الأمريكية",
    "code": "AS",
    "flag": "🇦🇸",
    "dial_code": "+1",
    "phone_placeholder": "684 XXX XXXX",
    "max_digits": 10,
    "prefix": "684"
  },
  {
    "name_en": "Antarctica",
    "name_ar": "أنتاركتيكا",
    "code": "AQ",
    "flag": "🇦🇶",
    "dial_code": "+0",
    "phone_placeholder": "XXXXXXXX",
    "max_digits": 8,
    "prefix": ""
  },
  {
    "name_en": "French Southern Territories",
    "name_ar": "المقاطعات الجنوبية الفرنسية",
    "code": "TF",
    "flag": "🇹🇫",
    "dial_code": "+0",
    "phone_placeholder": "XXX XXXX",
    "max_digits": 7,
    "prefix": ""
  },
  {
    "name_en": "Antigua and Barbuda",
    "name_ar": "أنتيغوا وباربودا",
    "code": "AG",
    "flag": "🇦🇬",
    "dial_code": "+1",
    "phone_placeholder": "268 XXX XXXX",
    "max_digits": 10,
    "prefix": "268"
  },
  {
    "name_en": "Australia",
    "name_ar": "أستراليا",
    "code": "AU",
    "flag": "🇦🇺",
    "dial_code": "+61",
    "phone_placeholder": "4XX XXX XXX",
    "max_digits": 9,
    "prefix": "4"
  },
  {
    "name_en": "Austria",
    "name_ar": "النمسا",
    "code": "AT",
    "flag": "🇦🇹",
    "dial_code": "+43",
    "phone_placeholder": "6XX XXX XXXX",
    "max_digits": 10,
    "prefix": "6"
  },
  {
    "name_en": "Azerbaijan",
    "name_ar": "أذربيجان",
    "code": "AZ",
    "flag": "🇦🇿",
    "dial_code": "+994",
    "phone_placeholder": "5X XXX XXXX",
    "max_digits": 9,
    "prefix": "5"
  },
  {
    "name_en": "Burundi",
    "name_ar": "بوروندي",
    "code": "BI",
    "flag": "🇧🇮",
    "dial_code": "+257",
    "phone_placeholder": "7X XX XXXX",
    "max_digits": 8,
    "prefix": "7"
  },
  {
    "name_en": "Belgium",
    "name_ar": "بلجيكا",
    "code": "BE",
    "flag": "🇧🇪",
    "dial_code": "+32",
    "phone_placeholder": "4XX XX XX XX",
    "max_digits": 9,
    "prefix": "4"
  },
  {
    "name_en": "Benin",
    "name_ar": "بنين",
    "code": "BJ",
    "flag": "🇧🇯",
    "dial_code": "+229",
    "phone_placeholder": "9X XX XX XX",
    "max_digits": 8,
    "prefix": "9"
  },
  {
    "name_en": "Bonaire, Sint Eustatius and Saba",
    "name_ar": "بونير وسانت يوستاتيوس وسابا",
    "code": "BQ",
    "flag": "🇧🇶",
    "dial_code": "+599",
    "phone_placeholder": "7XX XXXX",
    "max_digits": 7,
    "prefix": "7"
  },
  {
    "name_en": "Burkina Faso",
    "name_ar": "بوركينا فاسو",
    "code": "BF",
    "flag": "🇧🇫",
    "dial_code": "+226",
    "phone_placeholder": "6X XX XX XX",
    "max_digits": 8,
    "prefix": "6"
  },
  {
    "name_en": "Bangladesh",
    "name_ar": "بنغلاديش",
    "code": "BD",
    "flag": "🇧🇩",
    "dial_code": "+880",
    "phone_placeholder": "01XXX XXXXXX",
    "max_digits": 11,
    "prefix": "01"
  },
  {
    "name_en": "Bulgaria",
    "name_ar": "بلغاريا",
    "code": "BG",
    "flag": "🇧🇬",
    "dial_code": "+359",
    "phone_placeholder": "08X XXX XXX",
    "max_digits": 9,
    "prefix": "08"
  },
  {
    "name_en": "Bahrain",
    "name_ar": "البحرين",
    "code": "BH",
    "flag": "🇧🇭",
    "dial_code": "+973",
    "phone_placeholder": "3XXXXXXX",
    "max_digits": 8,
    "prefix": "3"
  },
  {
    "name_en": "Bahamas",
    "name_ar": "جزر البهاما",
    "code": "BS",
    "flag": "🇧🇸",
    "dial_code": "+1",
    "phone_placeholder": "242 XXX XXXX",
    "max_digits": 10,
    "prefix": "242"
  },
  {
    "name_en": "Bosnia and Herzegovina",
    "name_ar": "البوسنة والهرسك",
    "code": "BA",
    "flag": "🇧🇦",
    "dial_code": "+387",
    "phone_placeholder": "06X XXX XXX",
    "max_digits": 9,
    "prefix": "06"
  },
  {
    "name_en": "Saint Barthélemy",
    "name_ar": "سان بارتيليمي",
    "code": "BL",
    "flag": "🇧🇱",
    "dial_code": "+590",
    "phone_placeholder": "690 XX XX XX",
    "max_digits": 9,
    "prefix": "690"
  },
  {
    "name_en": "Belarus",
    "name_ar": "بيلاروس",
    "code": "BY",
    "flag": "🇧🇾",
    "dial_code": "+375",
    "phone_placeholder": "2X XXX XXXX",
    "max_digits": 9,
    "prefix": "2"
  },
  {
    "name_en": "Belize",
    "name_ar": "بليز",
    "code": "BZ",
    "flag": "🇧🇿",
    "dial_code": "+501",
    "phone_placeholder": "6XX XXXX",
    "max_digits": 7,
    "prefix": "6"
  },
  {
    "name_en": "Bermuda",
    "name_ar": "برمودا",
    "code": "BM",
    "flag": "🇧🇲",
    "dial_code": "+1",
    "phone_placeholder": "441 XXX XXXX",
    "max_digits": 10,
    "prefix": "441"
  },
  {
    "name_en": "Bolivia, Plurinational State of",
    "name_ar": "بوليفيا",
    "code": "BO",
    "flag": "🇧🇴",
    "dial_code": "+591",
    "phone_placeholder": "7XX XXXX",
    "max_digits": 7,
    "prefix": "7"
  },
  {
    "name_en": "Brazil",
    "name_ar": "البرازيل",
    "code": "BR",
    "flag": "🇧🇷",
    "dial_code": "+55",
    "phone_placeholder": "9XXXX XXXX",
    "max_digits": 9,
    "prefix": "9"
  },
  {
    "name_en": "Barbados",
    "name_ar": "بربادوس",
    "code": "BB",
    "flag": "🇧🇧",
    "dial_code": "+1",
    "phone_placeholder": "246 XXX XXXX",
    "max_digits": 10,
    "prefix": "246"
  },
  {
    "name_en": "Brunei Darussalam",
    "name_ar": "بروناي",
    "code": "BN",
    "flag": "🇧🇳",
    "dial_code": "+673",
    "phone_placeholder": "7XXX XXXX",
    "max_digits": 8,
    "prefix": "7"
  },
  {
    "name_en": "Bhutan",
    "name_ar": "بوتان",
    "code": "BT",
    "flag": "🇧🇹",
    "dial_code": "+975",
    "phone_placeholder": "17X XXX XX",
    "max_digits": 8,
    "prefix": "17"
  },
  {
    "name_en": "Bouvet Island",
    "name_ar": "جزيرة بوفيت",
    "code": "BV",
    "flag": "🇧🇻",
    "dial_code": "+0",
    "phone_placeholder": "XXX XXXX",
    "max_digits": 7,
    "prefix": ""
  },
  {
    "name_en": "Botswana",
    "name_ar": "بوتسوانا",
    "code": "BW",
    "flag": "🇧🇼",
    "dial_code": "+267",
    "phone_placeholder": "7X XXX XXX",
    "max_digits": 8,
    "prefix": "7"
  },
  {
    "name_en": "Central African Republic",
    "name_ar": "جمهورية إفريقيا الوسطى",
    "code": "CF",
    "flag": "🇨🇫",
    "dial_code": "+236",
    "phone_placeholder": "70 XX XX XX",
    "max_digits": 8,
    "prefix": "70"
  },
  {
    "name_en": "Canada",
    "name_ar": "كندا",
    "code": "CA",
    "flag": "🇨🇦",
    "dial_code": "+1",
    "phone_placeholder": "XXX XXX XXXX",
    "max_digits": 10,
    "prefix": ""
  },
  {
    "name_en": "Cocos (Keeling) Islands",
    "name_ar": "جزر كوكوس (كيلينغ)",
    "code": "CC",
    "flag": "🇨🇨",
    "dial_code": "+61",
    "phone_placeholder": "8 XXXX XXXX",
    "max_digits": 9,
    "prefix": "8"
  },
  {
    "name_en": "Switzerland",
    "name_ar": "سويسرا",
    "code": "CH",
    "flag": "🇨🇭",
    "dial_code": "+41",
    "phone_placeholder": "07X XXX XX XX",
    "max_digits": 10,
    "prefix": "07"
  },
  {
    "name_en": "Chile",
    "name_ar": "تشيلي",
    "code": "CL",
    "flag": "🇨🇱",
    "dial_code": "+56",
    "phone_placeholder": "9 XXXX XXXX",
    "max_digits": 9,
    "prefix": "9"
  },
  {
    "name_en": "China",
    "name_ar": "الصين",
    "code": "CN",
    "flag": "🇨🇳",
    "dial_code": "+86",
    "phone_placeholder": "1XX XXXX XXXX",
    "max_digits": 11,
    "prefix": "1"
  },
  {
    "name_en": "Côte d'Ivoire",
    "name_ar": "كوت ديفوار",
    "code": "CI",
    "flag": "🇨🇮",
    "dial_code": "+225",
    "phone_placeholder": "01 XX XX XXX",
    "max_digits": 9,
    "prefix": "01"
  },
  {
    "name_en": "Cameroon",
    "name_ar": "الكاميرون",
    "code": "CM",
    "flag": "🇨🇲",
    "dial_code": "+237",
    "phone_placeholder": "6XX XX XX XX",
    "max_digits": 9,
    "prefix": "6"
  },
  {
    "name_en": "Congo, The Democratic Republic of the",
    "name_ar": "جمهورية الكونغو الديمقراطية",
    "code": "CD",
    "flag": "🇨🇩",
    "dial_code": "+243",
    "phone_placeholder": "09X XXX XXXX",
    "max_digits": 10,
    "prefix": "09"
  },
  {
    "name_en": "Congo",
    "name_ar": "الكونغو",
    "code": "CG",
    "flag": "🇨🇬",
    "dial_code": "+242",
    "phone_placeholder": "06X XXX XXX",
    "max_digits": 9,
    "prefix": "06"
  },
  {
    "name_en": "Cook Islands",
    "name_ar": "جزر كوك",
    "code": "CK",
    "flag": "🇨🇰",
    "dial_code": "+682",
    "phone_placeholder": "7XXX",
    "max_digits": 4,
    "prefix": "7"
  },
  {
    "name_en": "Colombia",
    "name_ar": "كولومبيا",
    "code": "CO",
    "flag": "🇨🇴",
    "dial_code": "+57",
    "phone_placeholder": "3XX XXX XXXX",
    "max_digits": 10,
    "prefix": "3"
  },
  {
    "name_en": "Comoros",
    "name_ar": "جزر القمر",
    "code": "KM",
    "flag": "🇰🇲",
    "dial_code": "+269",
    "phone_placeholder": "32 XX XXX",
    "max_digits": 7,
    "prefix": "32"
  },
  {
    "name_en": "Cabo Verde",
    "name_ar": "الرأس الأخضر",
    "code": "CV",
    "flag": "🇨🇻",
    "dial_code": "+238",
    "phone_placeholder": "9XX XX XX",
    "max_digits": 7,
    "prefix": "9"
  },
  {
    "name_en": "Costa Rica",
    "name_ar": "كوستاريكا",
    "code": "CR",
    "flag": "🇨🇷",
    "dial_code": "+506",
    "phone_placeholder": "6XXXXXXX",
    "max_digits": 8,
    "prefix": "6"
  },
  {
    "name_en": "Cuba",
    "name_ar": "كوبا",
    "code": "CU",
    "flag": "🇨🇺",
    "dial_code": "+53",
    "phone_placeholder": "5XX XXXX",
    "max_digits": 7,
    "prefix": "5"
  },
  {
    "name_en": "Curaçao",
    "name_ar": "كوراساو",
    "code": "CW",
    "flag": "🇨🇼",
    "dial_code": "+599",
    "phone_placeholder": "9XX XXXX",
    "max_digits": 7,
    "prefix": "9"
  },
  {
    "name_en": "Christmas Island",
    "name_ar": "جزيرة عيد الميلاد",
    "code": "CX",
    "flag": "🇨🇽",
    "dial_code": "+61",
    "phone_placeholder": "8 XXXX XXXX",
    "max_digits": 9,
    "prefix": "8"
  },
  {
    "name_en": "Cayman Islands",
    "name_ar": "جزر كايمان",
    "code": "KY",
    "flag": "🇰🇾",
    "dial_code": "+1",
    "phone_placeholder": "345 XXX XXXX",
    "max_digits": 10,
    "prefix": "345"
  },
  {
    "name_en": "Cyprus",
    "name_ar": "قبرص",
    "code": "CY",
    "flag": "🇨🇾",
    "dial_code": "+357",
    "phone_placeholder": "9X XXX XXX",
    "max_digits": 8,
    "prefix": "9"
  },
  {
    "name_en": "Czechia",
    "name_ar": "التشيك",
    "code": "CZ",
    "flag": "🇨🇿",
    "dial_code": "+420",
    "phone_placeholder": "6XX XXX XXX",
    "max_digits": 9,
    "prefix": "6"
  },
  {
    "name_en": "Germany",
    "name_ar": "ألمانيا",
    "code": "DE",
    "flag": "🇩🇪",
    "dial_code": "+49",
    "phone_placeholder": "15X XXXX XXXX",
    "max_digits": 11,
    "prefix": "15"
  },
  {
    "name_en": "Djibouti",
    "name_ar": "جيبوتي",
    "code": "DJ",
    "flag": "🇩🇯",
    "dial_code": "+253",
    "phone_placeholder": "77 XX XX XX",
    "max_digits": 8,
    "prefix": "77"
  },
  {
    "name_en": "Dominica",
    "name_ar": "دومينيكا",
    "code": "DM",
    "flag": "🇩🇲",
    "dial_code": "+1",
    "phone_placeholder": "767 XXX XXXX",
    "max_digits": 10,
    "prefix": "767"
  },
  {
    "name_en": "Denmark",
    "name_ar": "الدنمارك",
    "code": "DK",
    "flag": "🇩🇰",
    "dial_code": "+45",
    "phone_placeholder": "2X XX XX XX",
    "max_digits": 8,
    "prefix": "2"
  },
  {
    "name_en": "Dominican Republic",
    "name_ar": "جمهورية الدومينيكان",
    "code": "DO",
    "flag": "🇩🇴",
    "dial_code": "+1",
    "phone_placeholder": "809 XXX XXXX",
    "max_digits": 10,
    "prefix": "809"
  },
  {
    "name_en": "Algeria",
    "name_ar": "الجزائر",
    "code": "DZ",
    "flag": "🇩🇿",
    "dial_code": "+213",
    "phone_placeholder": "05XX XX XX XX",
    "max_digits": 10,
    "prefix": "05"
  },
  {
    "name_en": "Ecuador",
    "name_ar": "الإكوادور",
    "code": "EC",
    "flag": "🇪🇨",
    "dial_code": "+593",
    "phone_placeholder": "09X XXX XXXX",
    "max_digits": 10,
    "prefix": "09"
  },
  {
    "name_en": "Egypt",
    "name_ar": "مصر",
    "code": "EG",
    "flag": "🇪🇬",
    "dial_code": "+20",
    "phone_placeholder": "01X XXXX XXXX",
    "max_digits": 11,
    "prefix": "01"
  },
  {
    "name_en": "Eritrea",
    "name_ar": "إريتريا",
    "code": "ER",
    "flag": "🇪🇷",
    "dial_code": "+291",
    "phone_placeholder": "07X XXX XXX",
    "max_digits": 9,
    "prefix": "07"
  },
  {
    "name_en": "Western Sahara",
    "name_ar": "الصحراء الغربية",
    "code": "EH",
    "flag": "🇪🇭",
    "dial_code": "+212",
    "phone_placeholder": "06X XXX XXX",
    "max_digits": 9,
    "prefix": "06"
  },
  {
    "name_en": "Spain",
    "name_ar": "إسبانيا",
    "code": "ES",
    "flag": "🇪🇸",
    "dial_code": "+34",
    "phone_placeholder": "6XX XXX XXX",
    "max_digits": 9,
    "prefix": "6"
  },
  {
    "name_en": "Estonia",
    "name_ar": "إستونيا",
    "code": "EE",
    "flag": "🇪🇪",
    "dial_code": "+372",
    "phone_placeholder": "5XXXXXXX",
    "max_digits": 8,
    "prefix": "5"
  },
  {
    "name_en": "Ethiopia",
    "name_ar": "إثيوبيا",
    "code": "ET",
    "flag": "🇪🇹",
    "dial_code": "+251",
    "phone_placeholder": "09X XXX XXXX",
    "max_digits": 10,
    "prefix": "09"
  },
  {
    "name_en": "Finland",
    "name_ar": "فنلندا",
    "code": "FI",
    "flag": "🇫🇮",
    "dial_code": "+358",
    "phone_placeholder": "4X XXX XXXX",
    "max_digits": 9,
    "prefix": "4"
  },
  {
    "name_en": "Fiji",
    "name_ar": "فيجي",
    "code": "FJ",
    "flag": "🇫🇯",
    "dial_code": "+679",
    "phone_placeholder": "7XXX XXX",
    "max_digits": 7,
    "prefix": "7"
  },
  {
    "name_en": "Falkland Islands (Malvinas)",
    "name_ar": "جزر فوكلاند (مالفيناس)",
    "code": "FK",
    "flag": "🇫🇰",
    "dial_code": "+500",
    "phone_placeholder": "5XXXXX",
    "max_digits": 6,
    "prefix": "5"
  },
  {
    "name_en": "France",
    "name_ar": "فرنسا",
    "code": "FR",
    "flag": "🇫🇷",
    "dial_code": "+33",
    "phone_placeholder": "06 XX XX XX XX",
    "max_digits": 10,
    "prefix": "06"
  },
  {
    "name_en": "Faroe Islands",
    "name_ar": "جزر فارو",
    "code": "FO",
    "flag": "🇫🇴",
    "dial_code": "+298",
    "phone_placeholder": "2XXXXXX",
    "max_digits": 7,
    "prefix": "2"
  },
  {
    "name_en": "Micronesia, Federated States of",
    "name_ar": "ميكرونيزيا، الولايات المتحدة",
    "code": "FM",
    "flag": "🇫🇲",
    "dial_code": "+691",
    "phone_placeholder": "3XX XXXX",
    "max_digits": 7,
    "prefix": "3"
  },
  {
    "name_en": "Gabon",
    "name_ar": "الغابون",
    "code": "GA",
    "flag": "🇬🇦",
    "dial_code": "+241",
    "phone_placeholder": "06 XX XX XX",
    "max_digits": 8,
    "prefix": "06"
  },
  {
    "name_en": "United Kingdom",
    "name_ar": "المملكة المتحدة",
    "code": "GB",
    "flag": "🇬🇧",
    "dial_code": "+44",
    "phone_placeholder": "07XXX XXXXXX",
    "max_digits": 11,
    "prefix": "07"
  },
  {
    "name_en": "Georgia",
    "name_ar": "جورجيا",
    "code": "GE",
    "flag": "🇬🇪",
    "dial_code": "+995",
    "phone_placeholder": "5XX XX XX XX",
    "max_digits": 9,
    "prefix": "5"
  },
  {
    "name_en": "Guernsey",
    "name_ar": "غيرنزي",
    "code": "GG",
    "flag": "🇬🇬",
    "dial_code": "+44",
    "phone_placeholder": "07XXX XXXXXX",
    "max_digits": 11,
    "prefix": "07"
  },
  {
    "name_en": "Ghana",
    "name_ar": "غانا",
    "code": "GH",
    "flag": "🇬🇭",
    "dial_code": "+233",
    "phone_placeholder": "05X XXX XXXX",
    "max_digits": 10,
    "prefix": "05"
  },
  {
    "name_en": "Gibraltar",
    "name_ar": "جبل طارق",
    "code": "GI",
    "flag": "🇬🇮",
    "dial_code": "+350",
    "phone_placeholder": "5XXXXXXX",
    "max_digits": 8,
    "prefix": "5"
  },
  {
    "name_en": "Guinea",
    "name_ar": "غينيا",
    "code": "GN",
    "flag": "🇬🇳",
    "dial_code": "+224",
    "phone_placeholder": "6X XXX XXX",
    "max_digits": 8,
    "prefix": "6"
  },
  {
    "name_en": "Guadeloupe",
    "name_ar": "غوادلوب",
    "code": "GP",
    "flag": "🇬🇵",
    "dial_code": "+590",
    "phone_placeholder": "690 XX XX XX",
    "max_digits": 9,
    "prefix": "690"
  },
  {
    "name_en": "Gambia",
    "name_ar": "غامبيا",
    "code": "GM",
    "flag": "🇬🇲",
    "dial_code": "+220",
    "phone_placeholder": "7XX XXXX",
    "max_digits": 7,
    "prefix": "7"
  },
  {
    "name_en": "Guinea-Bissau",
    "name_ar": "غينيا بيساو",
    "code": "GW",
    "flag": "🇬🇼",
    "dial_code": "+245",
    "phone_placeholder": "9X XXX XXX",
    "max_digits": 8,
    "prefix": "9"
  },
  {
    "name_en": "Equatorial Guinea",
    "name_ar": "غينيا الاستوائية",
    "code": "GQ",
    "flag": "🇬🇶",
    "dial_code": "+240",
    "phone_placeholder": "222 XXX XXX",
    "max_digits": 9,
    "prefix": "222"
  },
  {
    "name_en": "Greece",
    "name_ar": "اليونان",
    "code": "GR",
    "flag": "🇬🇷",
    "dial_code": "+30",
    "phone_placeholder": "69X XXX XXXX",
    "max_digits": 10,
    "prefix": "69"
  },
  {
    "name_en": "Grenada",
    "name_ar": "غرينادا",
    "code": "GD",
    "flag": "🇬🇩",
    "dial_code": "+1",
    "phone_placeholder": "473 XXX XXXX",
    "max_digits": 10,
    "prefix": "473"
  },
  {
    "name_en": "Greenland",
    "name_ar": "غرينلاند",
    "code": "GL",
    "flag": "🇬🇱",
    "dial_code": "+299",
    "phone_placeholder": "2XXXXXX",
    "max_digits": 7,
    "prefix": "2"
  },
  {
    "name_en": "Guatemala",
    "name_ar": "غواتيمالا",
    "code": "GT",
    "flag": "🇬🇹",
    "dial_code": "+502",
    "phone_placeholder": "5XXX XXXX",
    "max_digits": 8,
    "prefix": "5"
  },
  {
    "name_en": "French Guiana",
    "name_ar": "غويانا الفرنسية",
    "code": "GF",
    "flag": "🇬🇫",
    "dial_code": "+594",
    "phone_placeholder": "694 XX XX XX",
    "max_digits": 9,
    "prefix": "694"
  },
  {
    "name_en": "Guam",
    "name_ar": "غوام",
    "code": "GU",
    "flag": "🇬🇺",
    "dial_code": "+1",
    "phone_placeholder": "671 XXX XXXX",
    "max_digits": 10,
    "prefix": "671"
  },
  {
    "name_en": "Guyana",
    "name_ar": "غيانا",
    "code": "GY",
    "flag": "🇬🇾",
    "dial_code": "+592",
    "phone_placeholder": "6XX XXXX",
    "max_digits": 7,
    "prefix": "6"
  },
  {
    "name_en": "Hong Kong",
    "name_ar": "هونغ كونغ",
    "code": "HK",
    "flag": "🇭🇰",
    "dial_code": "+852",
    "phone_placeholder": "9XXXXXXX",
    "max_digits": 8,
    "prefix": "9"
  },
  {
    "name_en": "Heard Island and McDonald Islands",
    "name_ar": "جزيرة هيرد وجزر ماكدونالد",
    "code": "HM",
    "flag": "🇭🇲",
    "dial_code": "+0",
    "phone_placeholder": "X XXXX XXXX",
    "max_digits": 9,
    "prefix": ""
  },
  {
    "name_en": "Honduras",
    "name_ar": "هندوراس",
    "code": "HN",
    "flag": "🇭🇳",
    "dial_code": "+504",
    "phone_placeholder": "9XXX XXXX",
    "max_digits": 8,
    "prefix": "9"
  },
  {
    "name_en": "Croatia",
    "name_ar": "كرواتيا",
    "code": "HR",
    "flag": "🇭🇷",
    "dial_code": "+385",
    "phone_placeholder": "09X XXX XXXX",
    "max_digits": 10,
    "prefix": "09"
  },
  {
    "name_en": "Haiti",
    "name_ar": "هايتي",
    "code": "HT",
    "flag": "🇭🇹",
    "dial_code": "+509",
    "phone_placeholder": "3X XX XXXX",
    "max_digits": 8,
    "prefix": "3"
  },
  {
    "name_en": "Hungary",
    "name_ar": "المجر",
    "code": "HU",
    "flag": "🇭🇺",
    "dial_code": "+36",
    "phone_placeholder": "06X XXX XXXX",
    "max_digits": 10,
    "prefix": "06"
  },
  {
    "name_en": "Indonesia",
    "name_ar": "إندونيسيا",
    "code": "ID",
    "flag": "🇮🇩",
    "dial_code": "+62",
    "phone_placeholder": "08XX XXX XXXX",
    "max_digits": 11,
    "prefix": "08"
  },
  {
    "name_en": "Isle of Man",
    "name_ar": "جزيرة مان",
    "code": "IM",
    "flag": "🇮🇲",
    "dial_code": "+44",
    "phone_placeholder": "07XXX XXXXXX",
    "max_digits": 11,
    "prefix": "07"
  },
  {
    "name_en": "India",
    "name_ar": "الهند",
    "code": "IN",
    "flag": "🇮🇳",
    "dial_code": "+91",
    "phone_placeholder": "9XXXX XXXXX",
    "max_digits": 10,
    "prefix": "9"
  },
  {
    "name_en": "British Indian Ocean Territory",
    "name_ar": "إقليم المحيط الهندي البريطاني",
    "code": "IO",
    "flag": "🇮🇴",
    "dial_code": "+246",
    "phone_placeholder": "38XXX XXXXX",
    "max_digits": 10,
    "prefix": "38"
  },
  {
    "name_en": "Ireland",
    "name_ar": "أيرلندا",
    "code": "IE",
    "flag": "🇮🇪",
    "dial_code": "+353",
    "phone_placeholder": "08X XXX XXXX",
    "max_digits": 10,
    "prefix": "08"
  },
  {
    "name_en": "Iran, Islamic Republic of",
    "name_ar": "إيران",
    "code": "IR",
    "flag": "🇮🇷",
    "dial_code": "+98",
    "phone_placeholder": "09XX XXX XXXX",
    "max_digits": 11,
    "prefix": "09"
  },
  {
    "name_en": "Iraq",
    "name_ar": "العراق",
    "code": "IQ",
    "flag": "🇮🇶",
    "dial_code": "+964",
    "phone_placeholder": "07X XXX XXXX",
    "max_digits": 10,
    "prefix": "07"
  },
  {
    "name_en": "Iceland",
    "name_ar": "أيسلندا",
    "code": "IS",
    "flag": "🇮🇸",
    "dial_code": "+354",
    "phone_placeholder": "6XX XXXX",
    "max_digits": 7,
    "prefix": "6"
  },
  {
    "name_en": "Israel",
    "name_ar": "إسرائيل",
    "code": "IL",
    "flag": "🇮🇱",
    "dial_code": "+972",
    "phone_placeholder": "05X XXX XXXX",
    "max_digits": 10,
    "prefix": "05"
  },
  {
    "name_en": "Italy",
    "name_ar": "إيطاليا",
    "code": "IT",
    "flag": "🇮🇹",
    "dial_code": "+39",
    "phone_placeholder": "3XX XXX XXXX",
    "max_digits": 10,
    "prefix": "3"
  },
  {
    "name_en": "Jamaica",
    "name_ar": "جامايكا",
    "code": "JM",
    "flag": "🇯🇲",
    "dial_code": "+1",
    "phone_placeholder": "876 XXX XXXX",
    "max_digits": 10,
    "prefix": "876"
  },
  {
    "name_en": "Jersey",
    "name_ar": "جيرسي",
    "code": "JE",
    "flag": "🇯🇪",
    "dial_code": "+44",
    "phone_placeholder": "07XXX XXXXXX",
    "max_digits": 11,
    "prefix": "07"
  },
  {
    "name_en": "Jordan",
    "name_ar": "الأردن",
    "code": "JO",
    "flag": "🇯🇴",
    "dial_code": "+962",
    "phone_placeholder": "07X XXXX XXX",
    "max_digits": 10,
    "prefix": "07"
  },
  {
    "name_en": "Japan",
    "name_ar": "اليابان",
    "code": "JP",
    "flag": "🇯🇵",
    "dial_code": "+81",
    "phone_placeholder": "090 XXXX XXXX",
    "max_digits": 11,
    "prefix": "090"
  },
  {
    "name_en": "Kazakhstan",
    "name_ar": "كازاخستان",
    "code": "KZ",
    "flag": "🇰🇿",
    "dial_code": "+7",
    "phone_placeholder": "7XX XXX XXXX",
    "max_digits": 10,
    "prefix": "7"
  },
  {
    "name_en": "Kenya",
    "name_ar": "كينيا",
    "code": "KE",
    "flag": "🇰🇪",
    "dial_code": "+254",
    "phone_placeholder": "07XX XXX XXX",
    "max_digits": 10,
    "prefix": "07"
  },
  {
    "name_en": "Kyrgyzstan",
    "name_ar": "قرغيزستان",
    "code": "KG",
    "flag": "🇰🇬",
    "dial_code": "+996",
    "phone_placeholder": "7XX XXX XXX",
    "max_digits": 9,
    "prefix": "7"
  },
  {
    "name_en": "Cambodia",
    "name_ar": "كمبوديا",
    "code": "KH",
    "flag": "🇰🇭",
    "dial_code": "+855",
    "phone_placeholder": "0XX XXX XXX",
    "max_digits": 9,
    "prefix": "0"
  },
  {
    "name_en": "Kiribati",
    "name_ar": "كيريباتي",
    "code": "KI",
    "flag": "🇰🇮",
    "dial_code": "+686",
    "phone_placeholder": "7XXXX",
    "max_digits": 5,
    "prefix": "7"
  },
  {
    "name_en": "Saint Kitts and Nevis",
    "name_ar": "سانت كيتس ونيفيس",
    "code": "KN",
    "flag": "🇰🇳",
    "dial_code": "+1",
    "phone_placeholder": "869 XXX XXXX",
    "max_digits": 10,
    "prefix": "869"
  },
  {
    "name_en": "Korea, Republic of",
    "name_ar": "كوريا، جمهورية",
    "code": "KR",
    "flag": "🇰🇷",
    "dial_code": "+82",
    "phone_placeholder": "010 XXXX XXXX",
    "max_digits": 11,
    "prefix": "010"
  },
  {
    "name_en": "Kuwait",
    "name_ar": "الكويت",
    "code": "KW",
    "flag": "🇰🇼",
    "dial_code": "+965",
    "phone_placeholder": "5XXX XXXX",
    "max_digits": 8,
    "prefix": "5"
  },
  {
    "name_en": "Lao People's Democratic Republic",
    "name_ar": "جمهورية لاو الديمقراطية الشعبية",
    "code": "LA",
    "flag": "🇱🇦",
    "dial_code": "+856",
    "phone_placeholder": "020 XXXX XXX",
    "max_digits": 10,
    "prefix": "020"
  },
  {
    "name_en": "Lebanon",
    "name_ar": "لبنان",
    "code": "LB",
    "flag": "🇱🇧",
    "dial_code": "+961",
    "phone_placeholder": "03 XXX XXX",
    "max_digits": 8,
    "prefix": "03"
  },
  {
    "name_en": "Liberia",
    "name_ar": "ليبيريا",
    "code": "LR",
    "flag": "🇱🇷",
    "dial_code": "+231",
    "phone_placeholder": "07X XXX XXX",
    "max_digits": 9,
    "prefix": "07"
  },
  {
    "name_en": "Libya",
    "name_ar": "ليبيا",
    "code": "LY",
    "flag": "🇱🇾",
    "dial_code": "+218",
    "phone_placeholder": "09X XXX XXXX",
    "max_digits": 10,
    "prefix": "09"
  },
  {
    "name_en": "Saint Lucia",
    "name_ar": "سانت لوسيا",
    "code": "LC",
    "flag": "🇱🇨",
    "dial_code": "+1",
    "phone_placeholder": "758 XXX XXXX",
    "max_digits": 10,
    "prefix": "758"
  },
  {
    "name_en": "Liechtenstein",
    "name_ar": "ليختنشتاين",
    "code": "LI",
    "flag": "🇱🇮",
    "dial_code": "+423",
    "phone_placeholder": "6XX XX XX",
    "max_digits": 7,
    "prefix": "6"
  },
  {
    "name_en": "Sri Lanka",
    "name_ar": "سريلانكا",
    "code": "LK",
    "flag": "🇱🇰",
    "dial_code": "+94",
    "phone_placeholder": "07X XXX XXXX",
    "max_digits": 10,
    "prefix": "07"
  },
  {
    "name_en": "Lesotho",
    "name_ar": "ليسوتو",
    "code": "LS",
    "flag": "🇱🇸",
    "dial_code": "+266",
    "phone_placeholder": "5XXXXXXX",
    "max_digits": 8,
    "prefix": "5"
  },
  {
    "name_en": "Lithuania",
    "name_ar": "ليتوانيا",
    "code": "LT",
    "flag": "🇱🇹",
    "dial_code": "+370",
    "phone_placeholder": "6XX XXXXX",
    "max_digits": 8,
    "prefix": "6"
  },
  {
    "name_en": "Luxembourg",
    "name_ar": "لوكسمبورغ",
    "code": "LU",
    "flag": "🇱🇺",
    "dial_code": "+352",
    "phone_placeholder": "6X XX XX XX",
    "max_digits": 8,
    "prefix": "6"
  },
  {
    "name_en": "Latvia",
    "name_ar": "لاتفيا",
    "code": "LV",
    "flag": "🇱🇻",
    "dial_code": "+371",
    "phone_placeholder": "2XXXXXXX",
    "max_digits": 8,
    "prefix": "2"
  },
  {
    "name_en": "Macao",
    "name_ar": "ماكاو",
    "code": "MO",
    "flag": "🇲🇴",
    "dial_code": "+853",
    "phone_placeholder": "6XX XXXX",
    "max_digits": 7,
    "prefix": "6"
  },
  {
    "name_en": "Saint Martin (French part)",
    "name_ar": "سانت مارتن (الجزء الفرنسي)",
    "code": "MF",
    "flag": "🇲🇫",
    "dial_code": "+590",
    "phone_placeholder": "690 XX XX XX",
    "max_digits": 9,
    "prefix": "690"
  },
  {
    "name_en": "Morocco",
    "name_ar": "المغرب",
    "code": "MA",
    "flag": "🇲🇦",
    "dial_code": "+212",
    "phone_placeholder": "06X XXX XXXX",
    "max_digits": 10,
    "prefix": "06"
  },
  {
    "name_en": "Monaco",
    "name_ar": "موناكو",
    "code": "MC",
    "flag": "🇲🇨",
    "dial_code": "+377",
    "phone_placeholder": "6XX XX XX XX",
    "max_digits": 9,
    "prefix": "6"
  },
  {
    "name_en": "Moldova, Republic of",
    "name_ar": "مولدوفا",
    "code": "MD",
    "flag": "🇲🇩",
    "dial_code": "+373",
    "phone_placeholder": "06X XXXXXX",
    "max_digits": 9,
    "prefix": "06"
  },
  {
    "name_en": "Madagascar",
    "name_ar": "مدغشقر",
    "code": "MG",
    "flag": "🇲🇬",
    "dial_code": "+261",
    "phone_placeholder": "032 XX XXX XX",
    "max_digits": 10,
    "prefix": "032"
  },
  {
    "name_en": "Maldives",
    "name_ar": "المالديف",
    "code": "MV",
    "flag": "🇲🇻",
    "dial_code": "+960",
    "phone_placeholder": "7XXXXXX",
    "max_digits": 7,
    "prefix": "7"
  },
  {
    "name_en": "Mexico",
    "name_ar": "المكسيك",
    "code": "MX",
    "flag": "🇲🇽",
    "dial_code": "+52",
    "phone_placeholder": "55 XXXX XXXX",
    "max_digits": 10,
    "prefix": "55"
  },
  {
    "name_en": "Marshall Islands",
    "name_ar": "جزر مارشال",
    "code": "MH",
    "flag": "🇲🇭",
    "dial_code": "+692",
    "phone_placeholder": "235 XXXX",
    "max_digits": 7,
    "prefix": "235"
  },
  {
    "name_en": "North Macedonia",
    "name_ar": "مقدونيا الشمالية",
    "code": "MK",
    "flag": "🇲🇰",
    "dial_code": "+389",
    "phone_placeholder": "07X XXX XXX",
    "max_digits": 9,
    "prefix": "07"
  },
  {
    "name_en": "Mali",
    "name_ar": "مالي",
    "code": "ML",
    "flag": "🇲🇱",
    "dial_code": "+223",
    "phone_placeholder": "7X XX XX XX",
    "max_digits": 8,
    "prefix": "7"
  },
  {
    "name_en": "Malta",
    "name_ar": "مالطا",
    "code": "MT",
    "flag": "🇲🇹",
    "dial_code": "+356",
    "phone_placeholder": "99 XX XX XX",
    "max_digits": 8,
    "prefix": "99"
  },
  {
    "name_en": "Myanmar",
    "name_ar": "ميانمار",
    "code": "MM",
    "flag": "🇲🇲",
    "dial_code": "+95",
    "phone_placeholder": "09 XXX XXX XXX",
    "max_digits": 11,
    "prefix": "09"
  },
  {
    "name_en": "Montenegro",
    "name_ar": "الجبل الأسود",
    "code": "ME",
    "flag": "🇲🇪",
    "dial_code": "+382",
    "phone_placeholder": "06X XXX XXX",
    "max_digits": 9,
    "prefix": "06"
  },
  {
    "name_en": "Mongolia",
    "name_ar": "منغوليا",
    "code": "MN",
    "flag": "🇲🇳",
    "dial_code": "+976",
    "phone_placeholder": "8XX XXXX",
    "max_digits": 7,
    "prefix": "8"
  },
  {
    "name_en": "Northern Mariana Islands",
    "name_ar": "جزر ماريانا الشمالية",
    "code": "MP",
    "flag": "🇲🇵",
    "dial_code": "+1",
    "phone_placeholder": "670 XXX XXXX",
    "max_digits": 10,
    "prefix": "670"
  },
  {
    "name_en": "Mozambique",
    "name_ar": "موزمبيق",
    "code": "MZ",
    "flag": "🇲🇿",
    "dial_code": "+258",
    "phone_placeholder": "8X XXX XXX",
    "max_digits": 8,
    "prefix": "8"
  },
  {
    "name_en": "Mauritania",
    "name_ar": "موريتانيا",
    "code": "MR",
    "flag": "🇲🇷",
    "dial_code": "+222",
    "phone_placeholder": "2X XX XX XX",
    "max_digits": 8,
    "prefix": "2"
  },
  {
    "name_en": "Montserrat",
    "name_ar": "مونتسيرات",
    "code": "MS",
    "flag": "🇲🇸",
    "dial_code": "+1",
    "phone_placeholder": "664 XXX XXXX",
    "max_digits": 10,
    "prefix": "664"
  },
  {
    "name_en": "Martinique",
    "name_ar": "مارتينيك",
    "code": "MQ",
    "flag": "🇲🇶",
    "dial_code": "+596",
    "phone_placeholder": "696 XX XX XX",
    "max_digits": 9,
    "prefix": "696"
  },
  {
    "name_en": "Mauritius",
    "name_ar": "موريشيوس",
    "code": "MU",
    "flag": "🇲🇺",
    "dial_code": "+230",
    "phone_placeholder": "5XXX XXXX",
    "max_digits": 8,
    "prefix": "5"
  },
  {
    "name_en": "Malawi",
    "name_ar": "مالاوي",
    "code": "MW",
    "flag": "🇲🇼",
    "dial_code": "+265",
    "phone_placeholder": "099X XXX XXX",
    "max_digits": 10,
    "prefix": "099"
  },
  {
    "name_en": "Malaysia",
    "name_ar": "ماليزيا",
    "code": "MY",
    "flag": "🇲🇾",
    "dial_code": "+60",
    "phone_placeholder": "01X XXX XXXX",
    "max_digits": 10,
    "prefix": "01"
  },
  {
    "name_en": "Mayotte",
    "name_ar": "مايوت",
    "code": "YT",
    "flag": "🇾🇹",
    "dial_code": "+262",
    "phone_placeholder": "639 XX XX XX",
    "max_digits": 9,
    "prefix": "639"
  },
  {
    "name_en": "Namibia",
    "name_ar": "ناميبيا",
    "code": "NA",
    "flag": "🇳🇦",
    "dial_code": "+264",
    "phone_placeholder": "081 XXX XXXX",
    "max_digits": 10,
    "prefix": "081"
  },
  {
    "name_en": "New Caledonia",
    "name_ar": "كاليدونيا الجديدة",
    "code": "NC",
    "flag": "🇳🇨",
    "dial_code": "+687",
    "phone_placeholder": "75 XX XX",
    "max_digits": 6,
    "prefix": "75"
  },
  {
    "name_en": "Niger",
    "name_ar": "النيجر",
    "code": "NE",
    "flag": "🇳🇪",
    "dial_code": "+227",
    "phone_placeholder": "9X XX XX XX",
    "max_digits": 8,
    "prefix": "9"
  },
  {
    "name_en": "Norfolk Island",
    "name_ar": "جزيرة نورفولك",
    "code": "NF",
    "flag": "🇳🇫",
    "dial_code": "+672",
    "phone_placeholder": "3XXXX",
    "max_digits": 5,
    "prefix": "3"
  },
  {
    "name_en": "Nigeria",
    "name_ar": "نيجيريا",
    "code": "NG",
    "flag": "🇳🇬",
    "dial_code": "+234",
    "phone_placeholder": "080X XXX XXXX",
    "max_digits": 11,
    "prefix": "080"
  },
  {
    "name_en": "Nicaragua",
    "name_ar": "نيكاراغوا",
    "code": "NI",
    "flag": "🇳🇮",
    "dial_code": "+505",
    "phone_placeholder": "8XXXXXXX",
    "max_digits": 8,
    "prefix": "8"
  },
  {
    "name_en": "Niue",
    "name_ar": "نيوي",
    "code": "NU",
    "flag": "🇳🇺",
    "dial_code": "+683",
    "phone_placeholder": "4XXX",
    "max_digits": 4,
    "prefix": "4"
  },
  {
    "name_en": "Netherlands",
    "name_ar": "هولندا",
    "code": "NL",
    "flag": "🇳🇱",
    "dial_code": "+31",
    "phone_placeholder": "6X XXX XXXX",
    "max_digits": 9,
    "prefix": "6"
  },
  {
    "name_en": "Norway",
    "name_ar": "النرويج",
    "code": "NO",
    "flag": "🇳🇴",
    "dial_code": "+47",
    "phone_placeholder": "4XX XX XXX",
    "max_digits": 8,
    "prefix": "4"
  },
  {
    "name_en": "Nepal",
    "name_ar": "نيبال",
    "code": "NP",
    "flag": "🇳🇵",
    "dial_code": "+977",
    "phone_placeholder": "98X XXX XXXX",
    "max_digits": 10,
    "prefix": "98"
  },
  {
    "name_en": "Nauru",
    "name_ar": "ناورو",
    "code": "NR",
    "flag": "🇳🇷",
    "dial_code": "+674",
    "phone_placeholder": "555 XXXX",
    "max_digits": 7,
    "prefix": "555"
  },
  {
    "name_en": "New Zealand",
    "name_ar": "نيوزيلندا",
    "code": "NZ",
    "flag": "🇳🇿",
    "dial_code": "+64",
    "phone_placeholder": "02X XXX XXXX",
    "max_digits": 10,
    "prefix": "02"
  },
  {
    "name_en": "Oman",
    "name_ar": "عمان",
    "code": "OM",
    "flag": "🇴🇲",
    "dial_code": "+968",
    "phone_placeholder": "9XXXXXXX",
    "max_digits": 8,
    "prefix": "9"
  },
  {
    "name_en": "Pakistan",
    "name_ar": "باكستان",
    "code": "PK",
    "flag": "🇵🇰",
    "dial_code": "+92",
    "phone_placeholder": "03XX XXXXXXX",
    "max_digits": 11,
    "prefix": "03"
  },
  {
    "name_en": "Panama",
    "name_ar": "بنما",
    "code": "PA",
    "flag": "🇵🇦",
    "dial_code": "+507",
    "phone_placeholder": "6XXX XXXX",
    "max_digits": 8,
    "prefix": "6"
  },
  {
    "name_en": "Pitcairn",
    "name_ar": "بيتكيرن",
    "code": "PN",
    "flag": "🇵🇳",
    "dial_code": "+0",
    "phone_placeholder": "XXX XXXX",
    "max_digits": 7,
    "prefix": ""
  },
  {
    "name_en": "Peru",
    "name_ar": "بيرو",
    "code": "PE",
    "flag": "🇵🇪",
    "dial_code": "+51",
    "phone_placeholder": "9XX XXX XXX",
    "max_digits": 9,
    "prefix": "9"
  },
  {
    "name_en": "Philippines",
    "name_ar": "الفلبين",
    "code": "PH",
    "flag": "🇵🇭",
    "dial_code": "+63",
    "phone_placeholder": "09XX XXX XXXX",
    "max_digits": 11,
    "prefix": "09"
  },
  {
    "name_en": "Palau",
    "name_ar": "بالاو",
    "code": "PW",
    "flag": "🇵🇼",
    "dial_code": "+680",
    "phone_placeholder": "779 XXXX",
    "max_digits": 7,
    "prefix": "779"
  },
  {
    "name_en": "Papua New Guinea",
    "name_ar": "بابوا غينيا الجديدة",
    "code": "PG",
    "flag": "🇵🇬",
    "dial_code": "+675",
    "phone_placeholder": "7XXX XXXX",
    "max_digits": 8,
    "prefix": "7"
  },
  {
    "name_en": "Poland",
    "name_ar": "بولندا",
    "code": "PL",
    "flag": "🇵🇱",
    "dial_code": "+48",
    "phone_placeholder": "5XX XXX XXX",
    "max_digits": 9,
    "prefix": "5"
  },
  {
    "name_en": "Puerto Rico",
    "name_ar": "بورتو ريكو",
    "code": "PR",
    "flag": "🇵🇷",
    "dial_code": "+1",
    "phone_placeholder": "787 XXX XXXX",
    "max_digits": 10,
    "prefix": "787"
  },
  {
    "name_en": "Korea, Democratic People's Republic of",
    "name_ar": "كوريا، جمهورية الشعب الديمقراطية",
    "code": "KP",
    "flag": "🇰🇵",
    "dial_code": "+850",
    "phone_placeholder": "0192 XXX XXX",
    "max_digits": 10,
    "prefix": "0192"
  },
  {
    "name_en": "Portugal",
    "name_ar": "البرتغال",
    "code": "PT",
    "flag": "🇵🇹",
    "dial_code": "+351",
    "phone_placeholder": "9XX XXX XXX",
    "max_digits": 9,
    "prefix": "9"
  },
  {
    "name_en": "Paraguay",
    "name_ar": "باراغواي",
    "code": "PY",
    "flag": "🇵🇾",
    "dial_code": "+595",
    "phone_placeholder": "09X XXX XXX",
    "max_digits": 9,
    "prefix": "09"
  },
  {
    "name_en": "Palestine, State of",
    "name_ar": "فلسطين",
    "code": "PS",
    "flag": "🇵🇸",
    "dial_code": "+970",
    "phone_placeholder": "059X XXX XXX",
    "max_digits": 10,
    "prefix": "059"
  },
  {
    "name_en": "French Polynesia",
    "name_ar": "بولينيزيا الفرنسية",
    "code": "PF",
    "flag": "🇵🇫",
    "dial_code": "+689",
    "phone_placeholder": "87 XX XX XX",
    "max_digits": 8,
    "prefix": "87"
  },
  {
    "name_en": "Qatar",
    "name_ar": "قطر",
    "code": "QA",
    "flag": "🇶🇦",
    "dial_code": "+974",
    "phone_placeholder": "3X XXX XXXX",
    "max_digits": 9,
    "prefix": "3"
  },
  {
    "name_en": "Réunion",
    "name_ar": "لا ريونيون",
    "code": "RE",
    "flag": "🇷🇪",
    "dial_code": "+262",
    "phone_placeholder": "639 XX XX XX",
    "max_digits": 9,
    "prefix": "639"
  },
  {
    "name_en": "Romania",
    "name_ar": "رومانيا",
    "code": "RO",
    "flag": "🇷🇴",
    "dial_code": "+40",
    "phone_placeholder": "07X XXX XXXX",
    "max_digits": 10,
    "prefix": "07"
  },
  {
    "name_en": "Russian Federation",
    "name_ar": "روسيا",
    "code": "RU",
    "flag": "🇷🇺",
    "dial_code": "+7",
    "phone_placeholder": "9XX XXX XXXX",
    "max_digits": 10,
    "prefix": "9"
  },
  {
    "name_en": "Rwanda",
    "name_ar": "رواندا",
    "code": "RW",
    "flag": "🇷🇼",
    "dial_code": "+250",
    "phone_placeholder": "07X XXX XXX",
    "max_digits": 9,
    "prefix": "07"
  },
  {
    "name_en": "Saudi Arabia",
    "name_ar": "المملكة العربية السعودية",
    "code": "SA",
    "flag": "🇸🇦",
    "dial_code": "+966",
    "phone_placeholder": "05X XXX XXXX",
    "max_digits": 10,
    "prefix": "05"
  },
  {
    "name_en": "Sudan",
    "name_ar": "السودان",
    "code": "SD",
    "flag": "🇸🇩",
    "dial_code": "+249",
    "phone_placeholder": "09X XXX XXXX",
    "max_digits": 10,
    "prefix": "09"
  },
  {
    "name_en": "Senegal",
    "name_ar": "السنغال",
    "code": "SN",
    "flag": "🇸🇳",
    "dial_code": "+221",
    "phone_placeholder": "7X XXX XXXX",
    "max_digits": 9,
    "prefix": "7"
  },
  {
    "name_en": "Singapore",
    "name_ar": "سنغافورة",
    "code": "SG",
    "flag": "🇸🇬",
    "dial_code": "+65",
    "phone_placeholder": "8XXX XXXX",
    "max_digits": 8,
    "prefix": "8"
  },
  {
    "name_en": "South Georgia and the South Sandwich Islands",
    "name_ar": "جورجيا الجنوبية وجزر ساندويتش الجنوبية",
    "code": "GS",
    "flag": "🇬🇸",
    "dial_code": "+0",
    "phone_placeholder": "XXX XXX",
    "max_digits": 6,
    "prefix": ""
  },
  {
    "name_en": "Saint Helena, Ascension and Tristan da Cunha",
    "name_ar": "سانت هيلينا، أسينشن وترستان دا كونها",
    "code": "SH",
    "flag": "🇸🇭",
    "dial_code": "+290",
    "phone_placeholder": "6XXX",
    "max_digits": 4,
    "prefix": "6"
  },
  {
    "name_en": "Svalbard and Jan Mayen",
    "name_ar": "سفالبارد وجان ماين",
    "code": "SJ",
    "flag": "🇸🇯",
    "dial_code": "+47",
    "phone_placeholder": "4XX XX XXX",
    "max_digits": 8,
    "prefix": "4"
  },
  {
    "name_en": "Solomon Islands",
    "name_ar": "جزر سليمان",
    "code": "SB",
    "flag": "🇸🇧",
    "dial_code": "+677",
    "phone_placeholder": "7XXXX",
    "max_digits": 5,
    "prefix": "7"
  },
  {
    "name_en": "Sierra Leone",
    "name_ar": "سيراليون",
    "code": "SL",
    "flag": "🇸🇱",
    "dial_code": "+232",
    "phone_placeholder": "07X XXX XXX",
    "max_digits": 9,
    "prefix": "07"
  },
  {
    "name_en": "El Salvador",
    "name_ar": "السلفادور",
    "code": "SV",
    "flag": "🇸🇻",
    "dial_code": "+503",
    "phone_placeholder": "7XXX XXXX",
    "max_digits": 8,
    "prefix": "7"
  },
  {
    "name_en": "San Marino",
    "name_ar": "سان مارينو",
    "code": "SM",
    "flag": "🇸🇲",
    "dial_code": "+378",
    "phone_placeholder": "3XX XXX XXX",
    "max_digits": 9,
    "prefix": "3"
  },
  {
    "name_en": "Somalia",
    "name_ar": "الصومال",
    "code": "SO",
    "flag": "🇸🇴",
    "dial_code": "+252",
    "phone_placeholder": "61X XXX XXX",
    "max_digits": 9,
    "prefix": "61"
  },
  {
    "name_en": "Saint Pierre and Miquelon",
    "name_ar": "سانت بيير وميكولون",
    "code": "PM",
    "flag": "🇵🇲",
    "dial_code": "+508",
    "phone_placeholder": "690 XX XX XX",
    "max_digits": 9,
    "prefix": "690"
  },
  {
    "name_en": "Serbia",
    "name_ar": "صربيا",
    "code": "RS",
    "flag": "🇷🇸",
    "dial_code": "+381",
    "phone_placeholder": "06X XXX XXX",
    "max_digits": 9,
    "prefix": "06"
  },
  {
    "name_en": "South Sudan",
    "name_ar": "جنوب السودان",
    "code": "SS",
    "flag": "🇸🇸",
    "dial_code": "+211",
    "phone_placeholder": "09X XXX XXXX",
    "max_digits": 10,
    "prefix": "09"
  },
  {
    "name_en": "Sao Tome and Principe",
    "name_ar": "ساو تومي وبرينسيبي",
    "code": "ST",
    "flag": "🇸🇹",
    "dial_code": "+239",
    "phone_placeholder": "98X XXXX",
    "max_digits": 7,
    "prefix": "98"
  },
  {
    "name_en": "Suriname",
    "name_ar": "سورينام",
    "code": "SR",
    "flag": "🇸🇷",
    "dial_code": "+597",
    "phone_placeholder": "7XX XXXX",
    "max_digits": 7,
    "prefix": "7"
  },
  {
    "name_en": "Slovakia",
    "name_ar": "سلوفاكيا",
    "code": "SK",
    "flag": "🇸🇰",
    "dial_code": "+421",
    "phone_placeholder": "09X XXX XXX",
    "max_digits": 9,
    "prefix": "09"
  },
  {
    "name_en": "Slovenia",
    "name_ar": "سلوفينيا",
    "code": "SI",
    "flag": "🇸🇮",
    "dial_code": "+386",
    "phone_placeholder": "03X XXX XXX",
    "max_digits": 9,
    "prefix": "03"
  },
  {
    "name_en": "Sweden",
    "name_ar": "السويد",
    "code": "SE",
    "flag": "🇸🇪",
    "dial_code": "+46",
    "phone_placeholder": "07X XXX XXXX",
    "max_digits": 10,
    "prefix": "07"
  },
  {
    "name_en": "Eswatini",
    "name_ar": "إسواتيني",
    "code": "SZ",
    "flag": "🇸🇿",
    "dial_code": "+268",
    "phone_placeholder": "7X XX XXXX",
    "max_digits": 8,
    "prefix": "7"
  },
  {
    "name_en": "Sint Maarten (Dutch part)",
    "name_ar": "سانت مارتن (الجزء الهولندي)",
    "code": "SX",
    "flag": "🇸🇽",
    "dial_code": "+1",
    "phone_placeholder": "721 XXX XXXX",
    "max_digits": 10,
    "prefix": "721"
  },
  {
    "name_en": "Seychelles",
    "name_ar": "سيشيل",
    "code": "SC",
    "flag": "🇸🇨",
    "dial_code": "+248",
    "phone_placeholder": "2XX XXXX",
    "max_digits": 7,
    "prefix": "2"
  },
  {
    "name_en": "Syrian Arab Republic",
    "name_ar": "الجمهورية العربية السورية",
    "code": "SY",
    "flag": "🇸🇾",
    "dial_code": "+963",
    "phone_placeholder": "09X XXX XXX",
    "max_digits": 9,
    "prefix": "09"
  },
  {
    "name_en": "Turks and Caicos Islands",
    "name_ar": "جزر تركس وكايكوس",
    "code": "TC",
    "flag": "🇹🇨",
    "dial_code": "+1",
    "phone_placeholder": "649 XXX XXXX",
    "max_digits": 10,
    "prefix": "649"
  },
  {
    "name_en": "Chad",
    "name_ar": "تشاد",
    "code": "TD",
    "flag": "🇹🇩",
    "dial_code": "+235",
    "phone_placeholder": "6X XX XX XX",
    "max_digits": 8,
    "prefix": "6"
  },
  {
    "name_en": "Togo",
    "name_ar": "توجو",
    "code": "TG",
    "flag": "🇹🇬",
    "dial_code": "+228",
    "phone_placeholder": "9X XX XX XX",
    "max_digits": 8,
    "prefix": "9"
  },
  {
    "name_en": "Thailand",
    "name_ar": "تايلاند",
    "code": "TH",
    "flag": "🇹🇭",
    "dial_code": "+66",
    "phone_placeholder": "09X XXX XXXX",
    "max_digits": 10,
    "prefix": "09"
  },
  {
    "name_en": "Tajikistan",
    "name_ar": "طاجيكستان",
    "code": "TJ",
    "flag": "🇹🇯",
    "dial_code": "+992",
    "phone_placeholder": "9X XXX XXXX",
    "max_digits": 9,
    "prefix": "9"
  },
  {
    "name_en": "Tokelau",
    "name_ar": "توكيلاو",
    "code": "TK",
    "flag": "🇹🇰",
    "dial_code": "+690",
    "phone_placeholder": "4XXX",
    "max_digits": 4,
    "prefix": "4"
  },
  {
    "name_en": "Turkmenistan",
    "name_ar": "تركمانستان",
    "code": "TM",
    "flag": "🇹🇲",
    "dial_code": "+993",
    "phone_placeholder": "6X XXX XXX",
    "max_digits": 8,
    "prefix": "6"
  },
  {
    "name_en": "Timor-Leste",
    "name_ar": "تيمور-ليست",
    "code": "TL",
    "flag": "🇹🇱",
    "dial_code": "+670",
    "phone_placeholder": "7X XXX XXXX",
    "max_digits": 9,
    "prefix": "7"
  },
  {
    "name_en": "Tonga",
    "name_ar": "تونغا",
    "code": "TO",
    "flag": "🇹🇴",
    "dial_code": "+676",
    "phone_placeholder": "8XXX XXX",
    "max_digits": 7,
    "prefix": "8"
  },
  {
    "name_en": "Trinidad and Tobago",
    "name_ar": "ترينيداد وتوباغو",
    "code": "TT",
    "flag": "🇹🇹",
    "dial_code": "+1",
    "phone_placeholder": "868 XXX XXXX",
    "max_digits": 10,
    "prefix": "868"
  },
  {
    "name_en": "Tunisia",
    "name_ar": "تونس",
    "code": "TN",
    "flag": "🇹🇳",
    "dial_code": "+216",
    "phone_placeholder": "2X XXX XXX",
    "max_digits": 8,
    "prefix": "2"
  },
  {
    "name_en": "Türkiye",
    "name_ar": "تركيا",
    "code": "TR",
    "flag": "🇹🇷",
    "dial_code": "+90",
    "phone_placeholder": "05X XXX XXXX",
    "max_digits": 10,
    "prefix": "05"
  },
  {
    "name_en": "Tuvalu",
    "name_ar": "توفالو",
    "code": "TV",
    "flag": "🇹🇻",
    "dial_code": "+688",
    "phone_placeholder": "90XXX",
    "max_digits": 5,
    "prefix": "90"
  },
  {
    "name_en": "Taiwan, Province of China",
    "name_ar": "تايوان، مقاطعة الصين",
    "code": "TW",
    "flag": "🇹🇼",
    "dial_code": "+886",
    "phone_placeholder": "09XX XXX XXX",
    "max_digits": 10,
    "prefix": "09"
  },
  {
    "name_en": "Tanzania, United Republic of",
    "name_ar": "تنزانيا، جمهورية المتحدة",
    "code": "TZ",
    "flag": "🇹🇿",
    "dial_code": "+255",
    "phone_placeholder": "07X XXX XXXX",
    "max_digits": 10,
    "prefix": "07"
  },
  {
    "name_en": "Uganda",
    "name_ar": "أوغندا",
    "code": "UG",
    "flag": "🇺🇬",
    "dial_code": "+256",
    "phone_placeholder": "07X XXX XXX",
    "max_digits": 9,
    "prefix": "07"
  },
  {
    "name_en": "Ukraine",
    "name_ar": "أوكرانيا",
    "code": "UA",
    "flag": "🇺🇦",
    "dial_code": "+380",
    "phone_placeholder": "09X XXX XXXX",
    "max_digits": 10,
    "prefix": "09"
  },
  {
    "name_en": "United States Minor Outlying Islands",
    "name_ar": "جزر الولايات المتحدة البعيدة الصغرى",
    "code": "UM",
    "flag": "🇺🇲",
    "dial_code": "+0",
    "phone_placeholder": "XXX XXX XXXX",
    "max_digits": 10,
    "prefix": ""
  },
  {
    "name_en": "Uruguay",
    "name_ar": "أوروغواي",
    "code": "UY",
    "flag": "🇺🇾",
    "dial_code": "+598",
    "phone_placeholder": "09X XXX XXX",
    "max_digits": 9,
    "prefix": "09"
  },
  {
    "name_en": "United States",
    "name_ar": "الولايات المتحدة",
    "code": "US",
    "flag": "🇺🇸",
    "dial_code": "+1",
    "phone_placeholder": "XXX XXX XXXX",
    "max_digits": 10,
    "prefix": ""
  },
  {
    "name_en": "Uzbekistan",
    "name_ar": "أوزبكستان",
    "code": "UZ",
    "flag": "🇺🇿",
    "dial_code": "+998",
    "phone_placeholder": "9X XXX XXXX",
    "max_digits": 9,
    "prefix": "9"
  },
  {
    "name_en": "Holy See (Vatican City State)",
    "name_ar": "الكرسي الرسولي (دولة مدينة الفاتيكان)",
    "code": "VA",
    "flag": "🇻🇦",
    "dial_code": "+39",
    "phone_placeholder": "3XX XXX XXXX",
    "max_digits": 10,
    "prefix": "3"
  },
  {
    "name_en": "Saint Vincent and the Grenadines",
    "name_ar": "سانت فنسنت وجزر غرينادين",
    "code": "VC",
    "flag": "🇻🇨",
    "dial_code": "+1",
    "phone_placeholder": "784 XXX XXXX",
    "max_digits": 10,
    "prefix": "784"
  },
  {
    "name_en": "Venezuela, Bolivarian Republic of",
    "name_ar": "فنزويلا، جمهورية بوليفارية",
    "code": "VE",
    "flag": "🇻🇪",
    "dial_code": "+58",
    "phone_placeholder": "04XX XXX XXX",
    "max_digits": 10,
    "prefix": "04"
  },
  {
    "name_en": "Virgin Islands, British",
    "name_ar": "جزر العذراء البريطانية",
    "code": "VG",
    "flag": "🇻🇬",
    "dial_code": "+1",
    "phone_placeholder": "284 XXX XXXX",
    "max_digits": 10,
    "prefix": "284"
  },
  {
    "name_en": "Virgin Islands, U.S.",
    "name_ar": "جزر العذراء الأمريكية",
    "code": "VI",
    "flag": "🇻🇮",
    "dial_code": "+1",
    "phone_placeholder": "340 XXX XXXX",
    "max_digits": 10,
    "prefix": "340"
  },
  {
    "name_en": "Viet Nam",
    "name_ar": "فيتنام",
    "code": "VN",
    "flag": "🇻🇳",
    "dial_code": "+84",
    "phone_placeholder": "09X XXX XXXX",
    "max_digits": 10,
    "prefix": "09"
  },
  {
    "name_en": "Vanuatu",
    "name_ar": "فانواتو",
    "code": "VU",
    "flag": "🇻🇺",
    "dial_code": "+678",
    "phone_placeholder": "5XXXX",
    "max_digits": 5,
    "prefix": "5"
  },
  {
    "name_en": "Wallis and Futuna",
    "name_ar": "واليس وفوتونا",
    "code": "WF",
    "flag": "🇼🇫",
    "dial_code": "+681",
    "phone_placeholder": "50 XX XX XX",
    "max_digits": 8,
    "prefix": "50"
  },
  {
    "name_en": "Samoa",
    "name_ar": "ساموا",
    "code": "WS",
    "flag": "🇼🇸",
    "dial_code": "+685",
    "phone_placeholder": "7X XX XXXX",
    "max_digits": 8,
    "prefix": "7"
  },
  {
    "name_en": "Yemen",
    "name_ar": "اليمن",
    "code": "YE",
    "flag": "🇾🇪",
    "dial_code": "+967",
    "phone_placeholder": "7X XXX XXX",
    "max_digits": 8,
    "prefix": "7"
  },
  {
    "name_en": "South Africa",
    "name_ar": "جنوب أفريقيا",
    "code": "ZA",
    "flag": "🇿🇦",
    "dial_code": "+27",
    "phone_placeholder": "06X XXX XXXX",
    "max_digits": 10,
    "prefix": "06"
  },
  {
    "name_en": "Zambia",
    "name_ar": "زامبيا",
    "code": "ZM",
    "flag": "🇿🇲",
    "dial_code": "+260",
    "phone_placeholder": "09X XXX XXX",
    "max_digits": 9,
    "prefix": "09"
  },
  {
    "name_en": "Zimbabwe",
    "name_ar": "زيمبابوي",
    "code": "ZW",
    "flag": "🇿🇼",
    "dial_code": "+263",
    "phone_placeholder": "07X XXX XXX",
    "max_digits": 9,
    "prefix": "07"
  }
];
class CountryEntity {
  constructor(data) {
    this.data = data;
  }
  getName(lang = "en") {
    return this.data["name_" + lang];
  }
  getCode() {
    return this.data.code;
  }
  getFlag() {
    return this.data.flag;
  }
  getDialCode() {
    return this.data.dial_code;
  }
  getPhonePlaceholder() {
    return this.data.phone_placeholder;
  }
  getMaxDigits() {
    return this.data.max_digits;
  }
  getPrefix() {
    return this.data.prefix;
  }
}
class Countries {
  countries;
  constructor() {
    this.countries = countriesData.map((country) => new CountryEntity(country));
  }
  from(countries) {
    this.countries = this.get(countries);
    return this;
  }
  get(countries = []) {
    if (countries.length) {
      return this.countries.filter((country) => countries.includes(country.getCode()));
    }
    return this.countries;
  }
  first() {
    return this.countries[0] || null;
  }
}
const $countries = new Countries();
const _sfc_main$o = /* @__PURE__ */ Object.assign({
  name: "BsPhoneInput",
  inheritAttrs: false
}, {
  __name: "BsInputPhone",
  __ssrInlineRender: true,
  props: {
    id: String,
    resource: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    label: String,
    note: String,
    error: {
      type: String,
      default: ""
    },
    modelValue: {
      type: String,
      default: ""
    },
    defaultCountry: {
      type: String,
      default: "SA"
    },
    countries: {
      type: Array,
      default: () => []
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const attrs = useAttrs();
    const input = ref(null);
    const selectedCountry = ref(null);
    const invalid = ref(false);
    const validationError = ref("");
    const displayValue = ref("");
    const phoneNumber = ref(null);
    const isInternalUpdate = ref(false);
    const $phoneCountries = $countries.get();
    const computedId = computed(() => {
      return props.id || props.name;
    });
    const computedLabel = computed(() => {
      if (props.label) return props.label;
      const key = `${props.resource}.attributes.${props.name}`;
      const translated = trans(key);
      return translated === key ? null : translated;
    });
    const computedNote = computed(() => {
      if (props.note !== void 0 && props.note !== null) return props.note;
      const key = `${props.resource}.notes.${props.name}`;
      const translated = trans(key);
      return translated === key ? null : translated;
    });
    const search = ref("");
    const locale = ref(locales.current());
    const filteredCountries = computed(() => {
      let countries = $phoneCountries;
      if (props.countries.length > 0) {
        countries = countries.filter((c) => props.countries.includes(c.getCode()));
      }
      const query = search.value.trim().toLowerCase();
      if (!query) return countries;
      return countries.filter(
        (country) => `${country.getName("en")} ${country.getName("ar")} ${country.getCode()} ${country.getDialCode()} ${country.getFlag()}`.toLowerCase().includes(query)
      ).sort((a, b) => {
        const selectedCode = selectedCountry.value?.getCode();
        if (a.getCode() === selectedCode) return -1;
        if (b.getCode() === selectedCode) return 1;
        return 0;
      });
    });
    const qualifyModelValue = (value) => {
      if (!value) {
        displayValue.value = "";
        return;
      }
      try {
        phoneNumber.value = parsePhoneNumberFromString(value);
        if (phoneNumber.value) {
          selectedCountry.value = $phoneCountries.find((country) => country.getCode() === phoneNumber.value.country);
          displayValue.value = phoneNumber.value.formatNational();
        }
      } catch (error) {
        console.error("Invalid phone number:", error);
      }
    };
    watch(() => props.modelValue, (newVal) => {
      if (isInternalUpdate.value) {
        isInternalUpdate.value = false;
        return;
      }
      qualifyModelValue(newVal);
    }, { immediate: true });
    onMounted(() => {
      selectedCountry.value = $phoneCountries.find((country) => country.getCode() === props.defaultCountry);
      if (props.modelValue) {
        qualifyModelValue(props.modelValue);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-3" }, _attrs))} data-v-79cb4e0e>`);
      if (computedLabel.value) {
        _push(`<label${ssrRenderAttr("for", computedId.value)} class="form-label" data-v-79cb4e0e>${ssrInterpolate(computedLabel.value)}</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div data-v-79cb4e0e><div class="${ssrRenderClass([{ "is-invalid": !!__props.error || invalid.value }, "input-group"])}" data-v-79cb4e0e>`);
      if (locale.value.getDir() === "ltr") {
        _push(`<button class="${ssrRenderClass([{ "is-invalid": !!__props.error || invalid.value }, "form-control dropdown-toggle"])}" style="${ssrRenderStyle({ "flex": ".3" })}" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-v-79cb4e0e>${ssrInterpolate(selectedCountry.value?.getFlag())} ${ssrInterpolate(selectedCountry.value?.getDialCode())}</button>`);
      } else {
        _push(`<!---->`);
      }
      if (locale.value.getDir() === "ltr") {
        _push(`<ul class="dropdown-menu" style="${ssrRenderStyle({ "max-height": "250px", "overflow-y": "auto", "position": "relative", "padding-top": "0" })}" data-v-79cb4e0e><li style="${ssrRenderStyle({ "position": "sticky", "top": "0", "background": "var(--bs-dropdown-bg)", "z-index": "10" })}" data-v-79cb4e0e><div class="p-2 border-bottom" data-v-79cb4e0e><input type="text"${ssrRenderAttr("placeholder", unref(trans)("actions.search"))} class="form-control form-control-sm"${ssrRenderAttr("value", search.value)} data-v-79cb4e0e></div></li><!--[-->`);
        ssrRenderList(filteredCountries.value, (country) => {
          _push(`<li data-v-79cb4e0e><a class="${ssrRenderClass([{ active: selectedCountry.value?.getCode() === country.getCode() }, "dropdown-item"])}" href="javascript:void(0);" data-v-79cb4e0e>${ssrInterpolate(country.getFlag())} ${ssrInterpolate(country.getCode())} (${ssrInterpolate(country.getDialCode())}) </a></li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<input${ssrRenderAttrs(mergeProps({ type: "tel" }, unref(attrs), {
        ref_key: "input",
        ref: input,
        name: __props.name,
        value: displayValue.value,
        id: computedId.value,
        class: ["form-control", { "is-invalid": !!__props.error || invalid.value }],
        placeholder: selectedCountry.value?.getPhonePlaceholder(),
        inputmode: "tel",
        autocomplete: "tel",
        style: { "direction": "ltr", "text-align": "left" }
      }))} data-v-79cb4e0e>`);
      if (locale.value.getDir() === "rtl") {
        _push(`<button class="${ssrRenderClass([{ "is-invalid": !!__props.error || invalid.value }, "form-control dropdown-toggle"])}" style="${ssrRenderStyle({ "flex": ".3" })}" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-v-79cb4e0e>${ssrInterpolate(selectedCountry.value?.getFlag())} ${ssrInterpolate(selectedCountry.value?.getDialCode())}</button>`);
      } else {
        _push(`<!---->`);
      }
      if (locale.value.getDir() === "rtl") {
        _push(`<ul class="dropdown-menu" style="${ssrRenderStyle({ "max-height": "250px", "overflow-y": "auto", "position": "relative", "padding-top": "0" })}" data-v-79cb4e0e><li style="${ssrRenderStyle({ "position": "sticky", "top": "0", "background": "var(--bs-dropdown-bg)", "z-index": "10" })}" data-v-79cb4e0e><div class="p-2 border-bottom" data-v-79cb4e0e><input type="text"${ssrRenderAttr("placeholder", unref(trans)("actions.search"))} class="form-control form-control-sm"${ssrRenderAttr("value", search.value)} data-v-79cb4e0e></div></li><!--[-->`);
        ssrRenderList(filteredCountries.value, (country) => {
          _push(`<li data-v-79cb4e0e><a class="${ssrRenderClass([{ active: selectedCountry.value?.getCode() === country.getCode() }, "dropdown-item"])}" href="javascript:void(0);" data-v-79cb4e0e>${ssrInterpolate(country.getFlag())} ${ssrInterpolate(country.getName(locale.value.getCode()))} (${ssrInterpolate(country.getDialCode())}) </a></li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (computedNote.value) {
        _push(`<small class="text-muted" data-v-79cb4e0e>${ssrInterpolate(computedNote.value)}</small>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.error || invalid.value) {
        _push(`<div class="text-danger" data-v-79cb4e0e>${ssrInterpolate(__props.error || validationError.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Form/BsInputPhone.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const BsInputPhone = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-79cb4e0e"]]);
const _sfc_main$n = /* @__PURE__ */ Object.assign({
  name: "Register",
  layout: Guest
}, {
  __name: "Register",
  __ssrInlineRender: true,
  props: ["app", "config"],
  setup(__props) {
    const locales2 = inject("$locales");
    const form = useForm({
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(unref(trans)("auth.register.page_title"))} | ${ssrInterpolate(__props.app.name)}</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(unref(trans)("auth.register.page_title")) + " | " + toDisplayString(__props.app.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="authentication-inner row m-0"><div class="d-none d-lg-flex col-lg-7 col-xl-8 align-items-center p-5"><div class="w-100 d-flex justify-content-center"><img${ssrRenderAttr("src", __props.config.banner)} class="img-fluid" alt="Register image" width="700"></div></div><div class="d-flex col-12 col-lg-5 col-xl-4 align-items-center authentication-bg p-sm-5 p-4"><div class="w-px-400 mx-auto"><div class="app-brand mb-5">`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(route)("dashboard.home"),
        class: "app-brand-link gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.app.logo) {
              _push2(`<span class="app-brand-logo demo"${_scopeId}><img${ssrRenderAttr("src", __props.app.logo)} class="mw-100" style="${ssrRenderStyle({ "height": "60px" })}"${ssrRenderAttr("alt", __props.app.name)}${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span class="app-brand-text demo text-body fw-bold text-uppercase"${_scopeId}>${ssrInterpolate(__props.app.name)}</span>`);
          } else {
            return [
              __props.app.logo ? (openBlock(), createBlock("span", {
                key: 0,
                class: "app-brand-logo demo"
              }, [
                createVNode("img", {
                  src: __props.app.logo,
                  class: "mw-100",
                  style: { "height": "60px" },
                  alt: __props.app.name
                }, null, 8, ["src", "alt"])
              ])) : createCommentVNode("", true),
              createVNode("span", { class: "app-brand-text demo text-body fw-bold text-uppercase" }, toDisplayString(__props.app.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><h4 class="mb-2">${ssrInterpolate(unref(trans)("auth.register.title", { app: __props.app.name }))}</h4><p class="mb-4">${ssrInterpolate(unref(trans)("auth.register.subtitle"))}</p><form id="formAuthentication" class="mb-3" action="" method="POST">`);
      _push(ssrRenderComponent(_sfc_main$u, {
        resource: "auth.register",
        type: "text",
        name: "name",
        modelValue: unref(form).name,
        "onUpdate:modelValue": ($event) => unref(form).name = $event,
        autofocus: "",
        error: unref(form).errors.name
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$u, {
        resource: "auth.register",
        type: "text",
        name: "email",
        modelValue: unref(form).email,
        "onUpdate:modelValue": ($event) => unref(form).email = $event,
        error: unref(form).errors.email
      }, null, _parent));
      _push(ssrRenderComponent(BsInputPhone, {
        resource: "auth.register",
        type: "text",
        name: "phone",
        modelValue: unref(form).phone,
        "onUpdate:modelValue": ($event) => unref(form).phone = $event,
        error: unref(form).errors.phone
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$u, {
        resource: "auth.register",
        type: "password",
        name: "password",
        modelValue: unref(form).password,
        "onUpdate:modelValue": ($event) => unref(form).password = $event,
        error: unref(form).errors.password
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$u, {
        resource: "auth.register",
        type: "password",
        name: "password_confirmation",
        modelValue: unref(form).password_confirmation,
        "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
        error: unref(form).errors.password_confirmation
      }, null, _parent));
      _push(`<button type="submit" class="btn btn-primary d-grid w-100"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}>${ssrInterpolate(unref(trans)("auth.register.actions.submit"))}</button></form><p class="text-center"><span>${ssrInterpolate(unref(trans)("auth.register.actions.login-note"))}  </span>`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(route)("login")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>${ssrInterpolate(unref(trans)("auth.register.actions.login"))}</span>`);
          } else {
            return [
              createVNode("span", null, toDisplayString(unref(trans)("auth.register.actions.login")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p><p class="text-center"><!--[-->`);
      ssrRenderList(unref(locales2).get(), (locale) => {
        _push(`<!--[-->`);
        if (unref(locales2).current().getCode() === locale.getCode()) {
          _push(`<span class="text-muted d-inline-block me-2"><span class="me-1">${locale.getSvgFlag(20, 20) ?? ""}</span> ${ssrInterpolate(locale.getName())}</span>`);
        } else {
          _push(`<a class="d-inline-block me-2"${ssrRenderAttr("href", unref(route)("locale.change", locale.getCode()))}><span class="me-1">${locale.getSvgFlag(20, 20) ?? ""}</span> ${ssrInterpolate(locale.getName())}</a>`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></p><div class="text-center">`);
      _push(ssrRenderComponent(StyleSwitcher, null, null, _parent));
      _push(`</div></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Auth/Register.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$n
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$m = /* @__PURE__ */ Object.assign({
  name: "ResetPassword",
  layout: Guest
}, {
  __name: "ResetPassword",
  __ssrInlineRender: true,
  props: ["app", "config", "flash", "email", "token"],
  setup(__props) {
    const props = __props;
    const locales2 = inject("$locales");
    const form = useForm({
      email: props.email,
      token: props.token,
      password: "",
      password_confirmation: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(_ctx.$t("auth.reset_password.page_title"))} | ${ssrInterpolate(__props.app.name)}</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(_ctx.$t("auth.reset_password.page_title")) + " | " + toDisplayString(__props.app.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="authentication-inner row m-0"><div class="d-none d-lg-flex col-lg-7 col-xl-8 align-items-center p-5"><div class="w-100 d-flex justify-content-center"><img${ssrRenderAttr("src", __props.config.banner)} class="img-fluid" alt="Reset Password image" width="700"></div></div><div class="d-flex col-12 col-lg-5 col-xl-4 align-items-center authentication-bg p-sm-5 p-4"><div class="w-px-400 mx-auto"><div class="app-brand mb-5">`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(route)("dashboard.home"),
        class: "app-brand-link gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.app.logo) {
              _push2(`<span class="app-brand-logo demo"${_scopeId}><img${ssrRenderAttr("src", __props.app.logo)} class="mw-100" style="${ssrRenderStyle({ "height": "60px" })}"${ssrRenderAttr("alt", __props.app.name)}${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span class="app-brand-text demo text-body fw-bold text-uppercase"${_scopeId}>${ssrInterpolate(__props.app.name)}</span>`);
          } else {
            return [
              __props.app.logo ? (openBlock(), createBlock("span", {
                key: 0,
                class: "app-brand-logo demo"
              }, [
                createVNode("img", {
                  src: __props.app.logo,
                  class: "mw-100",
                  style: { "height": "60px" },
                  alt: __props.app.name
                }, null, 8, ["src", "alt"])
              ])) : createCommentVNode("", true),
              createVNode("span", { class: "app-brand-text demo text-body fw-bold text-uppercase" }, toDisplayString(__props.app.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><h4 class="mb-2">${ssrInterpolate(_ctx.$t("auth.reset_password.title", { app: __props.app.name }))}</h4><p class="mb-4">${ssrInterpolate(_ctx.$t("auth.reset_password.subtitle"))}</p><form id="formAuthentication" class="mb-3" action="" method="POST">`);
      _push(ssrRenderComponent(_sfc_main$u, {
        resource: "auth.reset_password",
        type: "text",
        name: "email",
        modelValue: unref(form).email,
        "onUpdate:modelValue": ($event) => unref(form).email = $event,
        error: unref(form).errors.email
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$u, {
        resource: "auth.register",
        type: "password",
        name: "password",
        modelValue: unref(form).password,
        "onUpdate:modelValue": ($event) => unref(form).password = $event,
        autofocus: "",
        error: unref(form).errors.password
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$u, {
        resource: "auth.register",
        type: "password",
        name: "password_confirmation",
        modelValue: unref(form).password_confirmation,
        "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
        error: unref(form).errors.password_confirmation
      }, null, _parent));
      _push(`<button type="submit" class="btn btn-primary d-grid w-100"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}>${ssrInterpolate(_ctx.$t("auth.reset_password.actions.submit"))}</button></form><p class="text-center">`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(route)("login")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>${ssrInterpolate(_ctx.$t("auth.reset_password.actions.login"))}</span>`);
          } else {
            return [
              createVNode("span", null, toDisplayString(_ctx.$t("auth.reset_password.actions.login")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p><p class="text-center"><!--[-->`);
      ssrRenderList(unref(locales2).get(), (locale) => {
        _push(`<!--[-->`);
        if (unref(locales2).current().getCode() === locale.getCode()) {
          _push(`<span class="text-muted d-inline-block me-2"><span class="me-1">${locale.getSvgFlag(20, 20) ?? ""}</span> ${ssrInterpolate(locale.getName())}</span>`);
        } else {
          _push(`<a class="d-inline-block me-2"${ssrRenderAttr("href", unref(route)("locale.change", locale.getCode()))}><span class="me-1">${locale.getSvgFlag(20, 20) ?? ""}</span> ${ssrInterpolate(locale.getName())}</a>`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></p><div class="text-center">`);
      _push(ssrRenderComponent(StyleSwitcher, null, null, _parent));
      _push(`</div></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Auth/ResetPassword.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$m
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$l = /* @__PURE__ */ Object.assign({
  name: "VerifyEmail",
  layout: Guest
}, {
  __name: "VerifyEmail",
  __ssrInlineRender: true,
  props: ["app", "config", "flash"],
  setup(__props) {
    const locales2 = inject("$locales");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(unref(trans)("auth.verify_email.page_title"))} | ${ssrInterpolate(__props.app.name)}</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(unref(trans)("auth.verify_email.page_title")) + " | " + toDisplayString(__props.app.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="authentication-inner row m-0"><div class="d-none d-lg-flex col-lg-7 col-xl-8 align-items-center p-5"><div class="w-100 d-flex justify-content-center"><img${ssrRenderAttr("src", __props.config.banner)} class="img-fluid" alt="Verify Email image" width="700"></div></div><div class="d-flex col-12 col-lg-5 col-xl-4 align-items-center authentication-bg p-sm-5 p-4"><div class="w-px-400 mx-auto"><div class="app-brand mb-5">`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(route)("dashboard.home"),
        class: "app-brand-link gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.app.logo) {
              _push2(`<span class="app-brand-logo demo"${_scopeId}><img${ssrRenderAttr("src", __props.app.logo)} class="mw-100" style="${ssrRenderStyle({ "height": "60px" })}"${ssrRenderAttr("alt", __props.app.name)}${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span class="app-brand-text demo text-body fw-bold text-uppercase"${_scopeId}>${ssrInterpolate(__props.app.name)}</span>`);
          } else {
            return [
              __props.app.logo ? (openBlock(), createBlock("span", {
                key: 0,
                class: "app-brand-logo demo"
              }, [
                createVNode("img", {
                  src: __props.app.logo,
                  class: "mw-100",
                  style: { "height": "60px" },
                  alt: __props.app.name
                }, null, 8, ["src", "alt"])
              ])) : createCommentVNode("", true),
              createVNode("span", { class: "app-brand-text demo text-body fw-bold text-uppercase" }, toDisplayString(__props.app.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><h3 class="mb-2">${ssrInterpolate(unref(trans)("auth.verify_email.title"))}</h3><p class="text-start">${ssrInterpolate(unref(trans)("auth.verify_email.subtitle"))}</p><a class="btn btn-primary w-100 my-3" href="javascript:void(0);">${ssrInterpolate(unref(trans)("auth.verify_email.actions.send"))}</a><p class="text-center">`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(route)("logout")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>${ssrInterpolate(unref(trans)("auth.logout"))}</span>`);
          } else {
            return [
              createVNode("span", null, toDisplayString(unref(trans)("auth.logout")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p><p class="text-center"><!--[-->`);
      ssrRenderList(unref(locales2).get(), (locale) => {
        _push(`<!--[-->`);
        if (unref(locales2).current().getCode() === locale.getCode()) {
          _push(`<span class="text-muted d-inline-block me-2"><span class="me-1">${locale.getSvgFlag(20, 20) ?? ""}</span> ${ssrInterpolate(locale.getName())}</span>`);
        } else {
          _push(`<a class="d-inline-block me-2"${ssrRenderAttr("href", unref(route)("locale.change", locale.getCode()))}><span class="me-1">${locale.getSvgFlag(20, 20) ?? ""}</span> ${ssrInterpolate(locale.getName())}</a>`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></p><div class="text-center">`);
      _push(ssrRenderComponent(StyleSwitcher, null, null, _parent));
      _push(`</div></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Auth/VerifyEmail.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$l
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  ...{ name: "BusinessRequestsIndex" },
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>Business Request Page</title>`);
          } else {
            return [
              createVNode("title", null, "Business Request Page")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1>Business Request Page</h1><!--]-->`);
    };
  }
});
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Dashboard/BusinessRequests/Index.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$k
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "Home",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>Dashboard Page</title>`);
          } else {
            return [
              createVNode("title", null, "Dashboard Page")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1>Hello World: Dashboard</h1><!--]-->`);
    };
  }
});
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Dashboard/Home.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$j
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  ...{ name: "POIRequestsIndex" },
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>POI Request Page</title>`);
          } else {
            return [
              createVNode("title", null, "POI Request Page")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1>POI Request Page</h1><!--]-->`);
    };
  }
});
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Dashboard/PoiRequests/Index.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$i
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  ...{ name: "POIsIndex" },
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>POIs Page</title>`);
          } else {
            return [
              createVNode("title", null, "POIs Page")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1>POIs Page</h1><!--]-->`);
    };
  }
});
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Dashboard/Pois/Index.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$h
}, Symbol.toStringTag, { value: "Module" }));
const breadcrumbs = ref([]);
function useBreadcrumbs() {
  function setBreadcrumbs(items) {
    breadcrumbs.value = items;
  }
  return { breadcrumbs, setBreadcrumbs };
}
const _sfc_main$g = /* @__PURE__ */ Object.assign({ name: "FilterIcon" }, {
  __name: "FilterIcon",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${ssrRenderAttrs(mergeProps(_ctx.$attrs, {
        viewBox: "0 0 20 20",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      }, _attrs))}><path d="M5 10H15M2.5 5H17.5M7.5 15H12.5" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Svgs/FilterIcon.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const _sfc_main$f = /* @__PURE__ */ Object.assign({ name: "FilterDropdown" }, {
  __name: "FilterDropdown",
  __ssrInlineRender: true,
  props: {
    submitButton: {
      type: Boolean,
      default: false
    }
  },
  emits: ["apply"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dropdown" }, _attrs))} data-v-98a999ac><button class="btn btn-label-secondary dropdown-toggle" type="button" id="filterDropdown" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false" data-v-98a999ac>`);
      _push(ssrRenderComponent(_sfc_main$g, {
        width: "20",
        height: "20",
        class: "me-2"
      }, null, _parent));
      _push(` ${ssrInterpolate(_ctx.$t("actions.filter"))}</button><div class="dropdown-menu p-0" style="${ssrRenderStyle({ "min-width": "250px", "z-index": "999999" })}" aria-labelledby="filterDropdown" data-v-98a999ac><div style="${ssrRenderStyle({ "max-height": "400px" })}" class="custom-scroll overflow-auto p-3" data-v-98a999ac>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
      if (__props.submitButton) {
        _push(`<div class="p-3 pt-0" data-v-98a999ac><hr class="dropdown-divider" data-v-98a999ac><button class="btn btn-sm btn-secondary w-100" data-v-98a999ac>${ssrInterpolate(_ctx.$t("actions.apply_filter"))}</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Tables/FilterDropdown.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const FilterDropdown = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-98a999ac"]]);
const _sfc_main$e = /* @__PURE__ */ Object.assign({ name: "EditIcon" }, {
  __name: "EditIcon",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${ssrRenderAttrs(mergeProps(_ctx.$attrs, {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        "stroke-width": "1.5",
        stroke: "currentColor"
      }, _attrs))}><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"></path></svg>`);
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Svgs/EditIcon.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _sfc_main$d = /* @__PURE__ */ Object.assign({ name: "DeleteIcon" }, {
  __name: "DeleteIcon",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${ssrRenderAttrs(mergeProps(_ctx.$attrs, {
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      }, _attrs))}><path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path d="M9 11.7349H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path d="M10.5 15.6543H13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path d="M3 5.5H21M16.0555 5.5L15.3729 4.09173C14.9194 3.15626 14.6926 2.68852 14.3015 2.39681C14.2148 2.3321 14.1229 2.27454 14.0268 2.2247C13.5937 2 13.0739 2 12.0343 2C10.9686 2 10.4358 2 9.99549 2.23412C9.89791 2.28601 9.80479 2.3459 9.7171 2.41317C9.32145 2.7167 9.10044 3.20155 8.65842 4.17126L8.05273 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>`);
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Svgs/DeleteIcon.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = /* @__PURE__ */ Object.assign({ name: "UserTypeBadge" }, {
  __name: "TypeBadge",
  __ssrInlineRender: true,
  props: ["type"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: ["badge", {
          "bg-label-primary": __props.type === "ADMIN",
          "bg-label-secondary": __props.type === "USER",
          "bg-label-warning": __props.type === "APP_USER"
        }]
      }, _attrs))}><span class="${ssrRenderClass([{
        "text-bg-primary": __props.type === "ADMIN",
        "text-bg-secondary": __props.type === "USER",
        "text-bg-warning": __props.type === "APP_USER"
      }, "badge badge-dot me-1"])}"></span> ${ssrInterpolate(_ctx.$t("users.types." + __props.type))}</span>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/User/TypeBadge.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = {
  __name: "Pagination",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const isFullPagination = computed(() => props.data.links && Array.isArray(props.data.links));
    const infoText = computed(() => {
      if (!props.data.total) return "";
      const from = props.data.from ?? 0;
      const to = props.data.to ?? 0;
      const total = props.data.total ?? 0;
      return trans("actions.pagination_showing", { from, to, total });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "row mx-3 justify-content-between" }, _attrs))}><div class="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto mt-0"><div class="dt-info" aria-live="polite" role="status">${ssrInterpolate(infoText.value)}</div></div><div class="d-md-flex align-items-center dt-layout-end col-md-auto ms-auto d-flex gap-md-4 justify-content-md-between justify-content-center gap-4 flex-wrap mt-0"><div class="dt-paging"><nav aria-label="pagination"><ul class="pagination mb-0">`);
      if (isFullPagination.value) {
        _push(`<!--[-->`);
        ssrRenderList(__props.data.links, (link, i) => {
          _push(`<li class="${ssrRenderClass([{ active: link.active, disabled: link.url === null }, "dt-paging-button page-item"])}">`);
          if (link.url) {
            _push(ssrRenderComponent(unref(Link), {
              class: "page-link",
              href: link.url
            }, null, _parent));
          } else {
            _push(`<button class="page-link" type="button" disabled>${link.label ?? ""}</button>`);
          }
          _push(`</li>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<li class="dt-paging-button page-item active"><button class="page-link" type="button">${ssrInterpolate(__props.data.current_page)}</button></li>`);
      }
      _push(`</ul></nav></div></div></div>`);
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Tables/Pagination.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ Object.assign({ name: "EyeIcon" }, {
  __name: "EyeIcon",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${ssrRenderAttrs(mergeProps(_ctx.$attrs, {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        "stroke-width": "1.5",
        stroke: "currentColor"
      }, _attrs))}><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path></svg>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Svgs/EyeIcon.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ Object.assign({ name: "UsersIndex" }, {
  __name: "Index",
  __ssrInlineRender: true,
  props: ["app", "users", "query"],
  setup(__props) {
    const props = __props;
    const filter = ref({
      type: props.query?.type || [],
      perPage: props.query?.perPage || void 0,
      q: props.query?.q || ""
    });
    const updateQuery = debounce((value) => {
      router.get(
        route("dashboard.users.index"),
        value,
        { preserveState: true, replace: true }
      );
    }, 200);
    watch(filter, (value) => {
      updateQuery(value);
    }, { deep: true });
    const selectedItems = ref([]);
    const applyFilters = () => {
      console.log(filter.value);
    };
    const { setBreadcrumbs } = useBreadcrumbs();
    onMounted(() => {
      console.log(router.params);
      setBreadcrumbs([
        { label: trans("sidebar.analytics"), href: "/" },
        { label: trans("users.plural") }
      ]);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(_ctx.$t("users.plural"))} | ${ssrInterpolate(__props.app.name)}</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(_ctx.$t("users.plural")) + " | " + toDisplayString(__props.app.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="card"><div class="card-header border-bottom"><div class="d-flex justify-content-between align-items-center"><h5 class="card-title">${ssrInterpolate(_ctx.$t("users.tracking"))} <small class="text-muted d-block mt-2">${ssrInterpolate(_ctx.$t("users.tracking_note"))}</small></h5><a href="#" class="btn btn-primary"><svg width="20" height="20" class="me-1" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.99935 4.16797V15.8346M4.16602 10.0013H15.8327" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg> ${ssrInterpolate(_ctx.$t("users.actions.create"))}</a></div></div><div class="table-responsive"><table class="table"><thead><tr><td colspan="100"><div class="row d-flex justify-content-between align-items-center"><div class="col-8"><button class="btn btn-label-danger"${ssrIncludeBooleanAttr(selectedItems.value.length === 0) ? " disabled" : ""}>`);
      _push(ssrRenderComponent(_sfc_main$d, {
        width: "18",
        height: "18",
        class: "me-2"
      }, null, _parent));
      _push(` ${ssrInterpolate(_ctx.$t("users.actions.delete_selected"))}</button></div><div class="col-4 d-flex align-items-center justify-content-between gap-2"><div class="input-group input-group-merge"><span class="input-group-text" id="basic-addon-search31"><i class="icon-base bx bx-search"></i></span><input type="text" class="form-control"${ssrRenderAttr("value", filter.value.q)}${ssrRenderAttr("placeholder", _ctx.$t("users.search"))}></div>`);
      _push(ssrRenderComponent(FilterDropdown, { onApply: applyFilters }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h6 class="dropdown-header px-0 mb-2"${_scopeId}>${ssrInterpolate(_ctx.$t("users.attributes.type"))}</h6><div class="form-check"${_scopeId}><input class="form-check-input" type="checkbox" value="APP_USER" id="APP_USER"${ssrIncludeBooleanAttr(Array.isArray(filter.value.type) ? ssrLooseContain(filter.value.type, "APP_USER") : filter.value.type) ? " checked" : ""}${_scopeId}><label class="form-check-label" for="APP_USER"${_scopeId}>${ssrInterpolate(_ctx.$t("users.types.APP_USER"))}</label></div><div class="form-check"${_scopeId}><input class="form-check-input" type="checkbox" value="USER" id="USER"${ssrIncludeBooleanAttr(Array.isArray(filter.value.type) ? ssrLooseContain(filter.value.type, "USER") : filter.value.type) ? " checked" : ""}${_scopeId}><label class="form-check-label" for="USER"${_scopeId}>${ssrInterpolate(_ctx.$t("users.types.USER"))}</label></div><div class="form-check"${_scopeId}><input class="form-check-input" type="checkbox" value="ADMIN" id="ADMIN"${ssrIncludeBooleanAttr(Array.isArray(filter.value.type) ? ssrLooseContain(filter.value.type, "ADMIN") : filter.value.type) ? " checked" : ""}${_scopeId}><label class="form-check-label" for="ADMIN"${_scopeId}>${ssrInterpolate(_ctx.$t("users.types.ADMIN"))}</label></div><hr class="dropdown-divider"${_scopeId}><h6 class="dropdown-header px-0 mb-2"${_scopeId}>${ssrInterpolate(_ctx.$t("users.perPage"))}</h6><input class="form-control" type="number" min="1"${ssrRenderAttr("value", filter.value.perPage)}${_scopeId}><hr class="dropdown-divider"${_scopeId}><h6 class="dropdown-header px-0 mb-2"${_scopeId}>${ssrInterpolate(_ctx.$t("users.attributes.email"))}</h6><input class="form-control" type="text" min="1"${ssrRenderAttr("value", filter.value.email)}${_scopeId}>`);
          } else {
            return [
              createVNode("h6", { class: "dropdown-header px-0 mb-2" }, toDisplayString(_ctx.$t("users.attributes.type")), 1),
              createVNode("div", { class: "form-check" }, [
                withDirectives(createVNode("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "APP_USER",
                  id: "APP_USER",
                  "onUpdate:modelValue": ($event) => filter.value.type = $event
                }, null, 8, ["onUpdate:modelValue"]), [
                  [vModelCheckbox, filter.value.type]
                ]),
                createVNode("label", {
                  class: "form-check-label",
                  for: "APP_USER"
                }, toDisplayString(_ctx.$t("users.types.APP_USER")), 1)
              ]),
              createVNode("div", { class: "form-check" }, [
                withDirectives(createVNode("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "USER",
                  id: "USER",
                  "onUpdate:modelValue": ($event) => filter.value.type = $event
                }, null, 8, ["onUpdate:modelValue"]), [
                  [vModelCheckbox, filter.value.type]
                ]),
                createVNode("label", {
                  class: "form-check-label",
                  for: "USER"
                }, toDisplayString(_ctx.$t("users.types.USER")), 1)
              ]),
              createVNode("div", { class: "form-check" }, [
                withDirectives(createVNode("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: "ADMIN",
                  id: "ADMIN",
                  "onUpdate:modelValue": ($event) => filter.value.type = $event
                }, null, 8, ["onUpdate:modelValue"]), [
                  [vModelCheckbox, filter.value.type]
                ]),
                createVNode("label", {
                  class: "form-check-label",
                  for: "ADMIN"
                }, toDisplayString(_ctx.$t("users.types.ADMIN")), 1)
              ]),
              createVNode("hr", { class: "dropdown-divider" }),
              createVNode("h6", { class: "dropdown-header px-0 mb-2" }, toDisplayString(_ctx.$t("users.perPage")), 1),
              withDirectives(createVNode("input", {
                class: "form-control",
                type: "number",
                min: "1",
                "onUpdate:modelValue": ($event) => filter.value.perPage = $event
              }, null, 8, ["onUpdate:modelValue"]), [
                [vModelText, filter.value.perPage]
              ]),
              createVNode("hr", { class: "dropdown-divider" }),
              createVNode("h6", { class: "dropdown-header px-0 mb-2" }, toDisplayString(_ctx.$t("users.attributes.email")), 1),
              withDirectives(createVNode("input", {
                class: "form-control",
                type: "text",
                min: "1",
                "onUpdate:modelValue": ($event) => filter.value.email = $event
              }, null, 8, ["onUpdate:modelValue"]), [
                [vModelText, filter.value.email]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></td></tr><tr class="table-active"><td style="${ssrRenderStyle({ "width": "40px" })}"><div class="form-check"><input class="form-check-input" type="checkbox" id="selectAll"></div></td><th>${ssrInterpolate(_ctx.$t("users.attributes.name"))}</th><th>${ssrInterpolate(_ctx.$t("users.attributes.phone"))}</th><th>${ssrInterpolate(_ctx.$t("users.attributes.type"))}</th><th>${ssrInterpolate(_ctx.$t("users.attributes.last_active"))}</th><th>${ssrInterpolate(_ctx.$t("users.attributes.created_at"))}</th><th>${ssrInterpolate(_ctx.$t("users.attributes.actions"))}</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(__props.users.data, (user) => {
        _push(`<tr class="${ssrRenderClass({ "bg-label-primary": selectedItems.value.includes(user.id) })}"><td><div class="form-check"><input class="form-check-input" multiple name="items[]"${ssrIncludeBooleanAttr(Array.isArray(selectedItems.value) ? ssrLooseContain(selectedItems.value, user.id) : selectedItems.value) ? " checked" : ""} type="checkbox"${ssrRenderAttr("value", user.id)}></div></td><td><div class="d-flex justify-content-start align-items-center user-name"><div class="avatar-wrapper"><div class="avatar avatar-sm me-4"><img${ssrRenderAttr("src", user.avatar)}${ssrRenderAttr("alt", user.name)} class="rounded-circle"></div></div><div class="d-flex flex-column">`);
        _push(ssrRenderComponent(unref(Link), {
          href: unref(route)("dashboard.users.show", user),
          class: "text-heading text-truncate"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="fw-medium"${_scopeId}>${ssrInterpolate(user.name)}</span>`);
            } else {
              return [
                createVNode("span", { class: "fw-medium" }, toDisplayString(user.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<small>${ssrInterpolate(user.email)}</small></div></div></td><td>${ssrInterpolate(user.phone)}</td><td>`);
        _push(ssrRenderComponent(_sfc_main$c, {
          type: user.type
        }, null, _parent));
        _push(`</td><td>3 min ago</td><td>Oct 10, 2024 ,10AM</td><td><div class="d-flex gap-3">`);
        _push(ssrRenderComponent(unref(Link), {
          href: unref(route)("dashboard.users.show", user),
          class: "text-muted"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$a, {
                width: "20",
                height: "20"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$a, {
                  width: "20",
                  height: "20"
                })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: unref(route)("dashboard.users.edit", user),
          class: "text-muted"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$e, {
                width: "20",
                height: "20"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$e, {
                  width: "20",
                  height: "20"
                })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: unref(route)("dashboard.users.show", user),
          class: "text-danger"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$d, {
                width: "20",
                height: "20"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$d, {
                  width: "20",
                  height: "20"
                })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="card-footer">`);
      if (__props.users) {
        _push(ssrRenderComponent(_sfc_main$b, { data: __props.users }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasAddUser" aria-labelledby="offcanvasAddUserLabel"><div class="offcanvas-header"><h5 id="offcanvasAddUserLabel" class="offcanvas-title">Add User</h5><button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button></div><div class="offcanvas-body mx-0 flex-grow-0"><form class="add-new-user pt-0" id="addNewUserForm" onsubmit="return false"><div class="mb-3"><label class="form-label" for="add-user-fullname">Full Name</label><input type="text" class="form-control" id="add-user-fullname" placeholder="John Doe" name="userFullname" aria-label="John Doe"></div><div class="mb-3"><label class="form-label" for="add-user-email">Email</label><input type="text" id="add-user-email" class="form-control" placeholder="john.doe@example.com" aria-label="john.doe@example.com" name="userEmail"></div><div class="mb-3"><label class="form-label" for="add-user-contact">Contact</label><input type="text" id="add-user-contact" class="form-control phone-mask" placeholder="+1 (609) 988-44-11" aria-label="john.doe@example.com" name="userContact"></div><div class="mb-3"><label class="form-label" for="add-user-company">Company</label><input type="text" id="add-user-company" class="form-control" placeholder="Web Developer" aria-label="jdoe1" name="companyName"></div><div class="mb-3"><label class="form-label" for="country">Country</label><select id="country" class="select2 form-select"><option value="">Select</option><option value="Australia">Australia</option><option value="Bangladesh">Bangladesh</option><option value="Belarus">Belarus</option><option value="Brazil">Brazil</option><option value="Canada">Canada</option><option value="China">China</option><option value="France">France</option><option value="Germany">Germany</option><option value="India">India</option><option value="Indonesia">Indonesia</option><option value="Israel">Israel</option><option value="Italy">Italy</option><option value="Japan">Japan</option><option value="Korea">Korea, Republic of</option><option value="Mexico">Mexico</option><option value="Philippines">Philippines</option><option value="Russia">Russian Federation</option><option value="South Africa">South Africa</option><option value="Thailand">Thailand</option><option value="Turkey">Turkey</option><option value="Ukraine">Ukraine</option><option value="United Arab Emirates">United Arab Emirates</option><option value="United Kingdom">United Kingdom</option><option value="United States">United States</option></select></div><div class="mb-3"><label class="form-label" for="user-role">User Role</label><select id="user-role" class="form-select"><option value="subscriber">Subscriber</option><option value="editor">Editor</option><option value="maintainer">Maintainer</option><option value="author">Author</option><option value="admin">Admin</option></select></div><div class="mb-4"><label class="form-label" for="user-plan">Select Plan</label><select id="user-plan" class="form-select"><option value="basic">Basic</option><option value="enterprise">Enterprise</option><option value="company">Company</option><option value="team">Team</option></select></div><button type="submit" class="btn btn-primary me-sm-3 me-1 data-submit"> Submit </button><button type="reset" class="btn btn-label-secondary" data-bs-dismiss="offcanvas"> Cancel </button></form></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Dashboard/Users/Index.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$9
}, Symbol.toStringTag, { value: "Module" }));
function useAuth() {
  const page = usePage();
  const auth2 = computed(() => page.props.auth);
  const user = computed(() => page.props.auth?.user ?? null);
  const logout = () => {
    router.post(route("logout"));
  };
  return {
    auth: auth2,
    user,
    logout
  };
}
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "Test",
  __ssrInlineRender: true,
  props: ["event"],
  setup(__props) {
    const { user } = useAuth();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h1 class="text-center">${ssrInterpolate(unref(user)?.name)}</h1><div class="card mb-4"><div class="card-widget-separator-wrapper"><div class="card-body card-widget-separator"><div class="row gy-4 gy-sm-1"><div class="col-sm-6 col-lg-3"><div class="d-flex justify-content-between align-items-start card-widget-1 border-end pb-3 pb-sm-0"><div><h6 class="mb-2">In-store Sales</h6><h4 class="mb-2">$5,345.43</h4><p class="mb-0"><span class="text-muted me-2">5k orders</span><span class="badge bg-label-success">+5.7%</span></p></div><div class="avatar me-sm-4"><span class="avatar-initial rounded bg-label-secondary"><i class="bx bx-store-alt bx-sm"></i></span></div></div><hr class="d-none d-sm-block d-lg-none me-4"></div><div class="col-sm-6 col-lg-3"><div class="d-flex justify-content-between align-items-start card-widget-2 border-end pb-3 pb-sm-0"><div><h6 class="mb-2">Website Sales</h6><h4 class="mb-2">$674,347.12</h4><p class="mb-0"><span class="text-muted me-2">21k orders</span><span class="badge bg-label-success">+12.4%</span></p></div><div class="avatar me-lg-4"><span class="avatar-initial rounded bg-label-secondary"><i class="bx bx-laptop bx-sm"></i></span></div></div><hr class="d-none d-sm-block d-lg-none"></div><div class="col-sm-6 col-lg-3"><div class="d-flex justify-content-between align-items-start border-end pb-3 pb-sm-0 card-widget-3"><div><h6 class="mb-2">Discount</h6><h4 class="mb-2">$14,235.12</h4><p class="mb-0 text-muted">6k orders</p></div><div class="avatar me-sm-4"><span class="avatar-initial rounded bg-label-secondary"><i class="bx bx-gift bx-sm"></i></span></div></div></div><div class="col-sm-6 col-lg-3"><div class="d-flex justify-content-between align-items-start"><div><h6 class="mb-2">Affiliate</h6><h4 class="mb-2">$8,345.23</h4><p class="mb-0"><span class="text-muted me-2">150 orders</span><span class="badge bg-label-danger">-3.5%</span></p></div><div class="avatar"><span class="avatar-initial rounded bg-label-secondary"><i class="bx bx-wallet bx-sm"></i></span></div></div></div></div></div></div></div><div class="card"><div class="card-header"><h5 class="card-title">Filter</h5><div class="d-flex justify-content-between align-items-center row py-3 gap-3 gap-md-0"><div class="col-md-4 product_status"></div><div class="col-md-4 product_category"></div><div class="col-md-4 product_stock"></div></div></div><div class="card-datatable table-responsive"><table class="datatables-products table border-top"><thead><tr><th></th><th></th><th>product</th><th>category</th><th>stock</th><th>sku</th><th>price</th><th>qty</th><th>status</th><th>actions</th></tr></thead></table></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Test.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$8
}, Symbol.toStringTag, { value: "Module" }));
const php_ar = {
  "actions.filter": "تصفية",
  "actions.apply_filter": "تطبيق التصفية",
  "actions.search": "بحث ...",
  "actions.pagination_showing": "عرض :from إلى :to من أصل :total نتائج",
  "actions.mode.light": "فاتح",
  "actions.mode.dark": "داكن",
  "actions.mode.system": "حسب النظام",
  "admins.plural": "المسؤولون",
  "admins.singular": "مسؤول",
  "admins.tracking": "متابعة المسؤولين",
  "admins.tracking_note": "تتبع المسؤولين داخل التطبيق في مكان واحد",
  "admins.all": "الكل",
  "admins.recently": "أضيف حديثًا",
  "admins.search": "بحث",
  "admins.empty": "لا يوجد مسؤولون",
  "admins.select": "اختر مسؤولًا",
  "admins.trashed": "المسؤولون المحذوفون",
  "admins.perPage": "عدد النتائج في كل صفحة",
  "admins.my_profile": "ملفي الشخصي",
  "admins.profile": "الملف الشخصي",
  "admins.edit_profile": "تعديل الملف الشخصي",
  "admins.about": "حول",
  "admins.contacts": "جهات الاتصال",
  "admins.tabs.details": "تفاصيل الملف الشخصي",
  "admins.tabs.password": "تغيير كلمة المرور",
  "admins.types.APP_USER": "مستخدم تطبيق",
  "admins.types.USER": "مستخدم",
  "admins.types.ADMIN": "مدير",
  "admins.actions.list": "عرض المسؤولين",
  "admins.actions.show": "عرض المسؤول",
  "admins.actions.create": "اضافة مسؤول جديد",
  "admins.actions.new": "جديد",
  "admins.actions.edit": "تعديل المسؤول",
  "admins.actions.delete": "حذف المسؤول",
  "admins.actions.restore": "استعادة",
  "admins.actions.forceDelete": "حذف نهائي",
  "admins.actions.save": "حفظ",
  "admins.actions.filter": "تصفية",
  "admins.actions.delete-account": "حذف الحساب",
  "admins.actions.avatar.upload": "رفع صورة",
  "admins.actions.avatar.reset": "إعادة تعيين",
  "admins.messages.created": "تم إنشاء المسؤول بنجاح.",
  "admins.messages.updated": "تم تحديث المسؤول بنجاح.",
  "admins.messages.profile-updated": "تم تحديث ملفك الشخصي بنجاح.",
  "admins.messages.deleted": "تم حذف المسؤول بنجاح.",
  "admins.messages.restored": "تم استعادة المسؤول بنجاح.",
  "admins.attributes.name": "الاسم",
  "admins.attributes.phone": "الهاتف",
  "admins.attributes.email": "البريد الإلكتروني",
  "admins.attributes.created_at": "تاريخ الانضمام",
  "admins.attributes.password": "كلمة المرور",
  "admins.attributes.password_confirmation": "تأكيد كلمة المرور",
  "admins.attributes.current_password": "كلمة المرور الحالية",
  "admins.attributes.new_password": "كلمة المرور الجديدة",
  "admins.attributes.type": "نوع المستخدم",
  "admins.attributes.role": "الدور",
  "admins.attributes.last_active": "اخر نشاط",
  "admins.attributes.language": "اللغة",
  "admins.attributes.avatar": "الصورة الشخصية",
  "admins.attributes.actions": "الإجراءات",
  "admins.notes.avatar": "الصيغ المسموح بها: JPG، JPEG، GIF، PNG.",
  "admins.delete-account.confirm-title": "هل أنت متأكد من رغبتك في حذف حسابك؟",
  "admins.delete-account.confirm-info": "بمجرد حذف حسابك، سيتم حذف جميع موارده وبياناته بشكل دائم. يرجى إدخال كلمة المرور لتأكيد رغبتك في حذف الحساب نهائيًا.",
  "admins.delete-account.confirm-check": "أؤكد تعطيل حسابي",
  "admins.delete-account.confirm": "تعطيل الحساب",
  "admins.dialogs.delete.title": "تحذير!",
  "admins.dialogs.delete.info": "هل أنت متأكد من رغبتك في حذف المسؤول؟",
  "admins.dialogs.delete.confirm": "حذف",
  "admins.dialogs.delete.cancel": "إلغاء",
  "admins.dialogs.restore.title": "تحذير!",
  "admins.dialogs.restore.info": "هل أنت متأكد من رغبتك في استعادة المسؤول؟",
  "admins.dialogs.restore.confirm": "استعادة",
  "admins.dialogs.restore.cancel": "إلغاء",
  "admins.dialogs.forceDelete.title": "تحذير!",
  "admins.dialogs.forceDelete.info": "هل أنت متأكد من رغبتك في الحذف النهائي للمسؤول؟",
  "admins.dialogs.forceDelete.confirm": "حذف نهائي",
  "admins.dialogs.forceDelete.cancel": "إلغاء",
  "auth.failed": "بيانات الاعتماد هذه غير متطابقة مع سجلاتنا.",
  "auth.password": "كلمة المرور التي تم إدخالها غير صحيحة.",
  "auth.throttle": "عدد محاولات تسجيل الدخول كبير جداً. الرجاء المحاولة مرة أخرى خلال :seconds ثانية.",
  "auth.logout": "تسجيل الخروج",
  "auth.register.page_title": "تسجيل",
  "auth.register.title": "ابدأ المغامرة هنا 🚀",
  "auth.register.subtitle": "اجعل إدارة تطبيقك سهلة وممتعة!",
  "auth.register.have_account": "هل لديك حساب بالفعل؟",
  "auth.register.actions.submit": "إنشاء حساب",
  "auth.register.actions.login": "تسجيل الدخول بدلاً من ذلك",
  "auth.register.actions.login-note": "لديك حساب بالفعل؟",
  "auth.register.attributes.name": "الاسم",
  "auth.register.attributes.email": "البريد الإلكتروني",
  "auth.register.attributes.phone": "رقم الهاتف",
  "auth.register.attributes.password": "كلمة المرور",
  "auth.register.attributes.password_confirmation": "تأكيد كلمة المرور",
  "auth.register.attributes.remember": "تذكرني",
  "auth.login.page_title": "تسجيل الدخول",
  "auth.login.title": "مرحبًا بك في :app 👋",
  "auth.login.subtitle": "يرجى تسجيل الدخول إلى حسابك وابدأ المغامرة",
  "auth.login.actions.submit": "تسجيل الدخول",
  "auth.login.actions.forget": "نسيت كلمة المرور",
  "auth.login.actions.register": "إنشاء حساب",
  "auth.login.actions.register-note": "ليس لديك حساب؟",
  "auth.login.attributes.email": "البريد الإلكتروني",
  "auth.login.attributes.password": "كلمة المرور",
  "auth.login.attributes.remember": "تذكرني",
  "auth.forget_password.page_title": "نسيت كلمة المرور",
  "auth.forget_password.title": "هل نسيت كلمة المرور؟ 🔒",
  "auth.forget_password.subtitle": "أدخل بريدك الإلكتروني وسنرسل لك تعليمات لإعادة تعيين كلمة المرور",
  "auth.forget_password.actions.submit": "إرسال رابط إعادة التعيين",
  "auth.forget_password.actions.login": "العودة لتسجيل الدخول",
  "auth.forget_password.attributes.email": "البريد الإلكتروني",
  "auth.reset_password.page_title": "إعادة تعيين كلمة المرور",
  "auth.reset_password.title": "إعادة تعيين كلمة المرور 🔒",
  "auth.reset_password.for": "لـ",
  "auth.reset_password.actions.submit": "تعيين كلمة مرور جديدة",
  "auth.reset_password.actions.login": "العودة لتسجيل الدخول",
  "auth.reset_password.notifications.otp": "كلمة المرور لمرة واحدة (OTP) الخاصة بك لاستعادة كلمة مرور :app هي :code وتنتهي صلاحيتها في :expireAt",
  "auth.reset_password.attributes.email": "البريد الإلكتروني",
  "auth.reset_password.attributes.password": "كلمة المرور الجديدة",
  "auth.reset_password.attributes.password_confirmation": "تأكيد كلمة المرور",
  "auth.verify_email.page_title": "تأكيد البريد الإلكتروني",
  "auth.verify_email.title": "أكد بريدك الإلكتروني ✉️",
  "auth.verify_email.subtitle": "برجاء تأكيد بريدك الإلكتروني بالنقر على الرابط الذي أرسلناه لك؟ إذا لم يصلك البريد، سنقوم بإرسال رابط آخر.",
  "auth.verify_email.messages.sent": "تم إرسال رابط تحقق جديد إلى عنوان البريد الإلكتروني الذي قدمته أثناء التسجيل.",
  "auth.verify_email.actions.send": "إعادة إرسال رابط التحقق",
  "auth.confirm_password.page_title": "تأكيد كلمة المرور",
  "auth.confirm_password.title": "تأكيد كلمة المرور 🔒",
  "auth.confirm_password.subtitle": "هذه منطقة آمنة من التطبيق. الرجاء تأكيد كلمة المرور قبل المتابعة.",
  "auth.confirm_password.actions.submit": "تأكيد",
  "auth.verify.title": "تحقق من رقم الهاتف 💬",
  "auth.verify.sub-title": "أرسلنا رمز التحقق إلى هاتفك المحمول. أدخل الرمز من الهاتف في الحقل أدناه.",
  "auth.verify.attributes.otp": "اكتب رمز الأمان المكون من 4 أرقام",
  "auth.verify.attributes.submit": "تحقق من حسابي",
  "auth.verify.actions.resend-note": "لم تتلقَ الرمز؟",
  "auth.verify.actions.resend": "إعادة إرسال",
  "auth.verify.actions.logout-note": "أو سجل الدخول بحساب آخر",
  "auth.verify.actions.logout": "تسجيل الخروج",
  "auth.verify.messages.already-verified": "رقم هاتفك مُحقق بالفعل.",
  "auth.verify.messages.sent": "أرسلنا رمز التحقق إلى هاتفك المحمول",
  "auth.verify.messages.resent": "تم إعادة إرسال OTP بنجاح.",
  "auth.verify.notifications.otp": "كلمة المرور لمرة واحدة (OTP) الخاصة بك لتسجيل :app هي :code وتنتهي صلاحيتها في :expireAt",
  "auth.verify.validation.otp.exists": "OTP غير صالح",
  "auth.verify.validation.otp.rate-limit": "يمكنك المحاولة مرة أخرى بعد :seconds ثانية.",
  "dashboard.home": "لوحة التحكم",
  "pagination.previous": "&laquo; السابق",
  "pagination.next": "التالي &raquo;",
  "passwords.reset": "تم إعادة تعيين كلمة المرور!",
  "passwords.sent": "تم إرسال رابط إعادة تعيين كلمة المرور!",
  "passwords.throttled": "يرجى الانتظار قبل المحاولة مرة أخرى.",
  "passwords.token": "رمز إعادة تعيين كلمة المرور غير صالح.",
  "passwords.user": "لا يمكننا العثور على مستخدم بهذا البريد الإلكتروني.",
  "settings.title": "الإعدادات",
  "settings.note.mail.title": "ملاحظة",
  "settings.note.mail.body": "تستخدم هذه البيانات فقط لإعدادات SMTP.",
  "settings.tabs.main": "الإعدادات الرئيسية",
  "settings.tabs.mail": "إعدادات البريد",
  "settings.tabs.sms": "إعدادات الرسائل القصيرة",
  "settings.actions.save": "حفظ",
  "settings.actions.logo.upload": "رفع الشعار",
  "settings.actions.logo.reset": "إعادة تعيين",
  "settings.actions.favicon.upload": "رفع أيقونة الموقع",
  "settings.actions.favicon.reset": "إعادة تعيين",
  "settings.messages.updated": "تم تحديث إعدادات التطبيق بنجاح.",
  "settings.attributes.APP_NAME": "اسم التطبيق",
  "settings.attributes.%APP_NAME%": "اسم التطبيق",
  "settings.attributes.APP_COPYRIGHT": "حقوق النشر",
  "settings.attributes.%APP_COPYRIGHT%": "حقوق النشر",
  "settings.attributes.APP_LOCALE": "لغة التطبيق",
  "settings.attributes.LOGO": "الشعار",
  "settings.attributes.FAVICON": "أيقونة الموقع",
  "settings.attributes.MAIL_HOST": "المضيف",
  "settings.attributes.MAIL_PORT": "المنفذ",
  "settings.attributes.MAIL_USERNAME": "اسم المستخدم",
  "settings.attributes.MAIL_PASSWORD": "كلمة المرور",
  "settings.attributes.MAIL_FROM_NAME": "اسم المرسل",
  "settings.attributes.MAIL_FROM_ADDRESS": "عنوان المرسل",
  "settings.attributes.SMS_ENABLED": "تفعيل خدمة الرسائل القصيرة",
  "settings.attributes.SMS_ENDPOINT": "رابط الخدمة",
  "settings.attributes.SMS_API_KEY": "مفتاح API",
  "settings.notes.LOGO": "الشعار الرئيسي لموقعك (يفضل بصيغة PNG)",
  "settings.notes.FAVICON": "أيقونة الموقع في المتصفح (32×32px)",
  "settings.notes.MAIL_PORT": "أدخل رقم منفذ SMTP صالح بين (1 - 65535)",
  "sidebar.analytics": "Analytics",
  "sidebar.services": "Services",
  "sidebar.pois": "POIs",
  "sidebar.poi_requests": "POI Requests",
  "sidebar.business_requests": "Business Requests",
  "users.plural": "المستخدمون",
  "users.singular": "مستخدم",
  "users.tracking": "متابعة المستخدمين",
  "users.tracking_note": "تتبع المستخدمين داخل التطبيق في مكان واحد",
  "users.all": "الكل",
  "users.recently": "أضيف حديثًا",
  "users.search": "بحث",
  "users.empty": "لا يوجد مستخدمون",
  "users.select": "اختر مستخدمًا",
  "users.trashed": "المستخدمون المحذوفون",
  "users.perPage": "عدد النتائج في كل صفحة",
  "users.my_profile": "ملفي الشخصي",
  "users.profile": "الملف الشخصي",
  "users.edit_profile": "تعديل الملف الشخصي",
  "users.about": "حول",
  "users.contacts": "جهات الاتصال",
  "users.tabs.details": "تفاصيل الملف الشخصي",
  "users.tabs.password": "تغيير كلمة المرور",
  "users.types.APP_USER": "مستخدم تطبيق",
  "users.types.USER": "مستخدم",
  "users.types.ADMIN": "مدير",
  "users.actions.list": "عرض المستخدمين",
  "users.actions.show": "عرض المستخدم",
  "users.actions.create": "إضافة مستخدم جديد",
  "users.actions.new": "جديد",
  "users.actions.edit": "تعديل المستخدم",
  "users.actions.delete": "حذف المستخدم",
  "users.actions.delete_selected": "حذف المستخدمين المحددين",
  "users.actions.restore": "استعادة",
  "users.actions.forceDelete": "حذف نهائي",
  "users.actions.save": "حفظ",
  "users.actions.filter": "تصفية",
  "users.actions.delete-account": "حذف الحساب",
  "users.actions.avatar.upload": "رفع صورة",
  "users.actions.avatar.reset": "إعادة تعيين",
  "users.messages.created": "تم إنشاء المستخدم بنجاح.",
  "users.messages.updated": "تم تحديث المستخدم بنجاح.",
  "users.messages.profile-updated": "تم تحديث ملفك الشخصي بنجاح.",
  "users.messages.deleted": "تم حذف المستخدم بنجاح.",
  "users.messages.restored": "تم استعادة المستخدم بنجاح.",
  "users.attributes.name": "الاسم",
  "users.attributes.phone": "الهاتف",
  "users.attributes.email": "البريد الإلكتروني",
  "users.attributes.created_at": "تاريخ الانضمام",
  "users.attributes.password": "كلمة المرور",
  "users.attributes.password_confirmation": "تأكيد كلمة المرور",
  "users.attributes.current_password": "كلمة المرور الحالية",
  "users.attributes.new_password": "كلمة المرور الجديدة",
  "users.attributes.type": "نوع المستخدم",
  "users.attributes.role": "الدور",
  "users.attributes.last_active": "آخر نشاط",
  "users.attributes.language": "اللغة",
  "users.attributes.avatar": "الصورة الشخصية",
  "users.attributes.actions": "الإجراءات",
  "users.notes.avatar": "الصيغ المسموح بها: JPG، JPEG، GIF، PNG.",
  "users.delete-account.confirm-title": "هل أنت متأكد من رغبتك في حذف حسابك؟",
  "users.delete-account.confirm-info": "بمجرد حذف حسابك، سيتم حذف جميع موارده وبياناته بشكل دائم. يرجى إدخال كلمة المرور لتأكيد رغبتك في حذف الحساب نهائيًا.",
  "users.delete-account.confirm-check": "أؤكد تعطيل حسابي",
  "users.delete-account.confirm": "تعطيل الحساب",
  "users.dialogs.delete.title": "تحذير!",
  "users.dialogs.delete.info": "هل أنت متأكد من رغبتك في حذف المستخدم؟",
  "users.dialogs.delete.confirm": "حذف",
  "users.dialogs.delete.cancel": "إلغاء",
  "users.dialogs.restore.title": "تحذير!",
  "users.dialogs.restore.info": "هل أنت متأكد من رغبتك في استعادة المستخدم؟",
  "users.dialogs.restore.confirm": "استعادة",
  "users.dialogs.restore.cancel": "إلغاء",
  "users.dialogs.forceDelete.title": "تحذير!",
  "users.dialogs.forceDelete.info": "هل أنت متأكد من رغبتك في الحذف النهائي للمستخدم؟",
  "users.dialogs.forceDelete.confirm": "حذف نهائي",
  "users.dialogs.forceDelete.cancel": "إلغاء",
  "validation.accepted": "يجب قبول حقل :attribute.",
  "validation.accepted_if": "يجب قبول حقل :attribute عندما يكون :other هو :value.",
  "validation.active_url": "يجب أن يكون حقل :attribute عنوان URL صالحًا.",
  "validation.after": "يجب أن يكون حقل :attribute تاريخًا بعد :date.",
  "validation.after_or_equal": "يجب أن يكون حقل :attribute تاريخًا بعد أو يساوي :date.",
  "validation.alpha": "يجب أن يحتوي حقل :attribute على أحرف فقط.",
  "validation.alpha_dash": "يجب أن يحتوي حقل :attribute على أحرف وأرقام وشرطات وشرطات سفلية فقط.",
  "validation.alpha_num": "يجب أن يحتوي حقل :attribute على أحرف وأرقام فقط.",
  "validation.any_of": "حقل :attribute غير صالح.",
  "validation.array": "يجب أن يكون حقل :attribute مصفوفة.",
  "validation.ascii": "يجب أن يحتوي حقل :attribute على رموز وأحرف ألفا رقمية أحادية البايت فقط.",
  "validation.before": "يجب أن يكون حقل :attribute تاريخًا قبل :date.",
  "validation.before_or_equal": "يجب أن يكون حقل :attribute تاريخًا قبل أو يساوي :date.",
  "validation.between.array": "يجب أن يحتوي حقل :attribute على عدد من العناصر بين :min و :max.",
  "validation.between.file": "يجب أن يكون حجم ملف :attribute بين :min و :max كيلوبايت.",
  "validation.between.numeric": "يجب أن تكون قيمة حقل :attribute بين :min و :max.",
  "validation.between.string": "يجب أن يتراوح عدد أحرف حقل :attribute بين :min و :max.",
  "validation.boolean": "يجب أن تكون قيمة حقل :attribute صحيحة أو خاطئة.",
  "validation.can": "يحتوي حقل :attribute على قيمة غير مصرح بها.",
  "validation.confirmed": "تأكيد حقل :attribute غير متطابق.",
  "validation.contains": "حقل :attribute يفتقد قيمة مطلوبة.",
  "validation.current_password": "كلمة المرور غير صحيحة.",
  "validation.date": "يجب أن يكون حقل :attribute تاريخًا صالحًا.",
  "validation.date_equals": "يجب أن يكون حقل :attribute تاريخًا يساوي :date.",
  "validation.date_format": "يجب أن يتطابق حقل :attribute مع التنسيق :format.",
  "validation.decimal": "يجب أن يحتوي حقل :attribute على :decimal منازل عشرية.",
  "validation.declined": "يجب رفض حقل :attribute.",
  "validation.declined_if": "يجب رفض حقل :attribute عندما يكون :other هو :value.",
  "validation.different": "يجب أن يكون حقل :attribute مختلفًا عن :other.",
  "validation.digits": "يجب أن يحتوي حقل :attribute على :digits أرقام.",
  "validation.digits_between": "يجب أن يحتوي حقل :attribute على عدد أرقام بين :min و :max.",
  "validation.dimensions": "أبعاد الصورة في حقل :attribute غير صالحة.",
  "validation.distinct": "حقل :attribute يحتوي على قيمة مكررة.",
  "validation.doesnt_end_with": "يجب ألا ينتهي حقل :attribute بأحد القيم التالية: :values.",
  "validation.doesnt_start_with": "يجب ألا يبدأ حقل :attribute بأحد القيم التالية: :values.",
  "validation.email": "يجب أن يكون حقل :attribute عنوان بريد إلكتروني صالح.",
  "validation.ends_with": "يجب أن ينتهي حقل :attribute بأحد القيم التالية: :values.",
  "validation.enum": "القيمة المختارة في حقل :attribute غير صالحة.",
  "validation.exists": "القيمة المختارة في حقل :attribute غير صالحة.",
  "validation.extensions": "يجب أن يحتوي حقل :attribute على أحد الامتدادات التالية: :values.",
  "validation.file": "يجب أن يكون حقل :attribute ملفًا.",
  "validation.filled": "يجب ملء حقل :attribute.",
  "validation.gt.array": "يجب أن يحتوي حقل :attribute على أكثر من :value عنصر.",
  "validation.gt.file": "يجب أن يكون حجم ملف :attribute أكبر من :value كيلوبايت.",
  "validation.gt.numeric": "يجب أن تكون قيمة حقل :attribute أكبر من :value.",
  "validation.gt.string": "يجب أن يكون عدد أحرف حقل :attribute أكبر من :value.",
  "validation.gte.array": "يجب أن يحتوي حقل :attribute على :value عناصر أو أكثر.",
  "validation.gte.file": "يجب أن يكون حجم ملف :attribute أكبر من أو يساوي :value كيلوبايت.",
  "validation.gte.numeric": "يجب أن تكون قيمة حقل :attribute أكبر من أو تساوي :value.",
  "validation.gte.string": "يجب أن يكون عدد أحرف حقل :attribute أكبر من أو يساوي :value.",
  "validation.hex_color": "يجب أن يكون حقل :attribute لون سداسي عشري صالح.",
  "validation.image": "يجب أن يكون حقل :attribute صورة.",
  "validation.in": "القيمة المختارة في حقل :attribute غير صالحة.",
  "validation.in_array": "يجب أن يكون حقل :attribute موجودًا في :other.",
  "validation.in_array_keys": "يجب أن يحتوي حقل :attribute على مفتاح واحد على الأقل من القيم التالية: :values.",
  "validation.integer": "يجب أن يكون حقل :attribute عددًا صحيحًا.",
  "validation.ip": "يجب أن يكون حقل :attribute عنوان IP صالح.",
  "validation.ipv4": "يجب أن يكون حقل :attribute عنوان IPv4 صالح.",
  "validation.ipv6": "يجب أن يكون حقل :attribute عنوان IPv6 صالح.",
  "validation.json": "يجب أن يكون حقل :attribute سلسلة JSON صالحة.",
  "validation.list": "يجب أن يكون حقل :attribute قائمة.",
  "validation.lowercase": "يجب أن يكون حقل :attribute بأحرف صغيرة.",
  "validation.lt.array": "يجب أن يحتوي حقل :attribute على أقل من :value عنصر.",
  "validation.lt.file": "يجب أن يكون حجم ملف :attribute أقل من :value كيلوبايت.",
  "validation.lt.numeric": "يجب أن تكون قيمة حقل :attribute أقل من :value.",
  "validation.lt.string": "يجب أن يكون عدد أحرف حقل :attribute أقل من :value.",
  "validation.lte.array": "يجب ألا يحتوي حقل :attribute على أكثر من :value عنصر.",
  "validation.lte.file": "يجب أن يكون حجم ملف :attribute أقل من أو يساوي :value كيلوبايت.",
  "validation.lte.numeric": "يجب أن تكون قيمة حقل :attribute أقل من أو تساوي :value.",
  "validation.lte.string": "يجب أن يكون عدد أحرف حقل :attribute أقل من أو يساوي :value.",
  "validation.mac_address": "يجب أن يكون حقل :attribute عنوان MAC صالح.",
  "validation.max.array": "يجب ألا يحتوي حقل :attribute على أكثر من :max عنصر.",
  "validation.max.file": "يجب ألا يتجاوز حجم ملف :attribute :max كيلوبايت.",
  "validation.max.numeric": "يجب ألا تكون قيمة حقل :attribute أكبر من :max.",
  "validation.max.string": "يجب ألا يتجاوز عدد أحرف حقل :attribute :max.",
  "validation.max_digits": "يجب ألا يحتوي حقل :attribute على أكثر من :max أرقام.",
  "validation.mimes": "يجب أن يكون ملف :attribute من نوع: :values.",
  "validation.mimetypes": "يجب أن يكون ملف :attribute من نوع: :values.",
  "validation.min.array": "يجب أن يحتوي حقل :attribute على الأقل :min عنصر.",
  "validation.min.file": "يجب أن يكون حجم ملف :attribute على الأقل :min كيلوبايت.",
  "validation.min.numeric": "يجب أن تكون قيمة حقل :attribute على الأقل :min.",
  "validation.min.string": "يجب أن يكون عدد أحرف حقل :attribute على الأقل :min.",
  "validation.min_digits": "يجب أن يحتوي حقل :attribute على الأقل :min أرقام.",
  "validation.missing": "يجب أن يكون حقل :attribute مفقودًا.",
  "validation.missing_if": "يجب أن يكون حقل :attribute مفقودًا عندما يكون :other هو :value.",
  "validation.missing_unless": "يجب أن يكون حقل :attribute مفقودًا إلا إذا كان :other هو :value.",
  "validation.missing_with": "يجب أن يكون حقل :attribute مفقودًا عند وجود :values.",
  "validation.missing_with_all": "يجب أن يكون حقل :attribute مفقودًا عند وجود جميع القيم: :values.",
  "validation.multiple_of": "يجب أن تكون قيمة حقل :attribute من مضاعفات :value.",
  "validation.not_in": "القيمة المختارة في حقل :attribute غير صالحة.",
  "validation.not_regex": "تنسيق حقل :attribute غير صالح.",
  "validation.numeric": "يجب أن تكون قيمة حقل :attribute رقمًا.",
  "validation.password.letters": "يجب أن يحتوي حقل :attribute على حرف واحد على الأقل.",
  "validation.password.mixed": "يجب أن يحتوي حقل :attribute على حرف كبير وحرف صغير على الأقل.",
  "validation.password.numbers": "يجب أن يحتوي حقل :attribute على رقم واحد على الأقل.",
  "validation.password.symbols": "يجب أن يحتوي حقل :attribute على رمز واحد على الأقل.",
  "validation.password.uncompromised": "تم العثور على :attribute في تسريب بيانات. يرجى اختيار قيمة مختلفة.",
  "validation.present": "يجب أن يكون حقل :attribute موجودًا.",
  "validation.present_if": "يجب أن يكون حقل :attribute موجودًا عندما يكون :other هو :value.",
  "validation.present_unless": "يجب أن يكون حقل :attribute موجودًا ما لم يكن :other هو :value.",
  "validation.present_with": "يجب أن يكون حقل :attribute موجودًا عند وجود :values.",
  "validation.present_with_all": "يجب أن يكون حقل :attribute موجودًا عند وجود جميع القيم: :values.",
  "validation.prohibited": "حقل :attribute محظور.",
  "validation.prohibited_if": "حقل :attribute محظور عندما يكون :other هو :value.",
  "validation.prohibited_if_accepted": "حقل :attribute محظور عندما يتم قبول :other.",
  "validation.prohibited_if_declined": "حقل :attribute محظور عندما يتم رفض :other.",
  "validation.prohibited_unless": "حقل :attribute محظور ما لم يكن :other ضمن :values.",
  "validation.prohibits": "حقل :attribute يمنع وجود :other.",
  "validation.regex": "تنسيق حقل :attribute غير صالح.",
  "validation.required": "حقل :attribute مطلوب.",
  "validation.required_array_keys": "يجب أن يحتوي حقل :attribute على مفاتيح: :values.",
  "validation.required_if": "حقل :attribute مطلوب عندما يكون :other هو :value.",
  "validation.required_if_accepted": "حقل :attribute مطلوب عند قبول :other.",
  "validation.required_if_declined": "حقل :attribute مطلوب عند رفض :other.",
  "validation.required_unless": "حقل :attribute مطلوب ما لم يكن :other ضمن :values.",
  "validation.required_with": "حقل :attribute مطلوب عند وجود :values.",
  "validation.required_with_all": "حقل :attribute مطلوب عند وجود جميع القيم: :values.",
  "validation.required_without": "حقل :attribute مطلوب عند عدم وجود :values.",
  "validation.required_without_all": "حقل :attribute مطلوب عند عدم وجود أي من: :values.",
  "validation.same": "يجب أن يطابق حقل :attribute حقل :other.",
  "validation.size.array": "يجب أن يحتوي حقل :attribute على :size عنصر.",
  "validation.size.file": "يجب أن يكون حجم ملف :attribute :size كيلوبايت.",
  "validation.size.numeric": "يجب أن تكون قيمة حقل :attribute :size.",
  "validation.size.string": "يجب أن يكون عدد أحرف حقل :attribute :size.",
  "validation.starts_with": "يجب أن يبدأ حقل :attribute بأحد القيم التالية: :values.",
  "validation.string": "يجب أن يكون حقل :attribute سلسلة نصية.",
  "validation.timezone": "يجب أن يكون حقل :attribute نطاق زمني صالح.",
  "validation.unique": "تم استخدام :attribute مسبقًا.",
  "validation.uploaded": "فشل في رفع :attribute.",
  "validation.uppercase": "يجب أن يكون حقل :attribute بأحرف كبيرة.",
  "validation.url": "يجب أن يكون حقل :attribute عنوان URL صالح.",
  "validation.ulid": "يجب أن يكون حقل :attribute ULID صالح.",
  "validation.uuid": "يجب أن يكون حقل :attribute UUID صالح.",
  "validation.custom.attribute-name.rule-name": "رسالة مخصصة"
};
const __vite_glob_1_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: php_ar
}, Symbol.toStringTag, { value: "Module" }));
const php_en = {
  "auth.failed": "These credentials do not match our records.",
  "auth.password": "The provided password is incorrect.",
  "auth.throttle": "Too many login attempts. Please try again in :seconds seconds.",
  "pagination.previous": "&laquo; Previous",
  "pagination.next": "Next &raquo;",
  "passwords.reset": "Your password has been reset.",
  "passwords.sent": "We have emailed your password reset link.",
  "passwords.throttled": "Please wait before retrying.",
  "passwords.token": "This password reset token is invalid.",
  "passwords.user": "We can't find a user with that email address.",
  "validation.accepted": "The :attribute field must be accepted.",
  "validation.accepted_if": "The :attribute field must be accepted when :other is :value.",
  "validation.active_url": "The :attribute field must be a valid URL.",
  "validation.after": "The :attribute field must be a date after :date.",
  "validation.after_or_equal": "The :attribute field must be a date after or equal to :date.",
  "validation.alpha": "The :attribute field must only contain letters.",
  "validation.alpha_dash": "The :attribute field must only contain letters, numbers, dashes, and underscores.",
  "validation.alpha_num": "The :attribute field must only contain letters and numbers.",
  "validation.any_of": "The :attribute field is invalid.",
  "validation.array": "The :attribute field must be an array.",
  "validation.ascii": "The :attribute field must only contain single-byte alphanumeric characters and symbols.",
  "validation.before": "The :attribute field must be a date before :date.",
  "validation.before_or_equal": "The :attribute field must be a date before or equal to :date.",
  "validation.between.array": "The :attribute field must have between :min and :max items.",
  "validation.between.file": "The :attribute field must be between :min and :max kilobytes.",
  "validation.between.numeric": "The :attribute field must be between :min and :max.",
  "validation.between.string": "The :attribute field must be between :min and :max characters.",
  "validation.boolean": "The :attribute field must be true or false.",
  "validation.can": "The :attribute field contains an unauthorized value.",
  "validation.confirmed": "The :attribute field confirmation does not match.",
  "validation.contains": "The :attribute field is missing a required value.",
  "validation.current_password": "The password is incorrect.",
  "validation.date": "The :attribute field must be a valid date.",
  "validation.date_equals": "The :attribute field must be a date equal to :date.",
  "validation.date_format": "The :attribute field must match the format :format.",
  "validation.decimal": "The :attribute field must have :decimal decimal places.",
  "validation.declined": "The :attribute field must be declined.",
  "validation.declined_if": "The :attribute field must be declined when :other is :value.",
  "validation.different": "The :attribute field and :other must be different.",
  "validation.digits": "The :attribute field must be :digits digits.",
  "validation.digits_between": "The :attribute field must be between :min and :max digits.",
  "validation.dimensions": "The :attribute field has invalid image dimensions.",
  "validation.distinct": "The :attribute field has a duplicate value.",
  "validation.doesnt_contain": "The :attribute field must not contain any of the following: :values.",
  "validation.doesnt_end_with": "The :attribute field must not end with one of the following: :values.",
  "validation.doesnt_start_with": "The :attribute field must not start with one of the following: :values.",
  "validation.email": "The :attribute field must be a valid email address.",
  "validation.ends_with": "The :attribute field must end with one of the following: :values.",
  "validation.enum": "The selected :attribute is invalid.",
  "validation.exists": "The selected :attribute is invalid.",
  "validation.extensions": "The :attribute field must have one of the following extensions: :values.",
  "validation.file": "The :attribute field must be a file.",
  "validation.filled": "The :attribute field must have a value.",
  "validation.gt.array": "The :attribute field must have more than :value items.",
  "validation.gt.file": "The :attribute field must be greater than :value kilobytes.",
  "validation.gt.numeric": "The :attribute field must be greater than :value.",
  "validation.gt.string": "The :attribute field must be greater than :value characters.",
  "validation.gte.array": "The :attribute field must have :value items or more.",
  "validation.gte.file": "The :attribute field must be greater than or equal to :value kilobytes.",
  "validation.gte.numeric": "The :attribute field must be greater than or equal to :value.",
  "validation.gte.string": "The :attribute field must be greater than or equal to :value characters.",
  "validation.hex_color": "The :attribute field must be a valid hexadecimal color.",
  "validation.image": "The :attribute field must be an image.",
  "validation.in": "The selected :attribute is invalid.",
  "validation.in_array": "The :attribute field must exist in :other.",
  "validation.in_array_keys": "The :attribute field must contain at least one of the following keys: :values.",
  "validation.integer": "The :attribute field must be an integer.",
  "validation.ip": "The :attribute field must be a valid IP address.",
  "validation.ipv4": "The :attribute field must be a valid IPv4 address.",
  "validation.ipv6": "The :attribute field must be a valid IPv6 address.",
  "validation.json": "The :attribute field must be a valid JSON string.",
  "validation.list": "The :attribute field must be a list.",
  "validation.lowercase": "The :attribute field must be lowercase.",
  "validation.lt.array": "The :attribute field must have less than :value items.",
  "validation.lt.file": "The :attribute field must be less than :value kilobytes.",
  "validation.lt.numeric": "The :attribute field must be less than :value.",
  "validation.lt.string": "The :attribute field must be less than :value characters.",
  "validation.lte.array": "The :attribute field must not have more than :value items.",
  "validation.lte.file": "The :attribute field must be less than or equal to :value kilobytes.",
  "validation.lte.numeric": "The :attribute field must be less than or equal to :value.",
  "validation.lte.string": "The :attribute field must be less than or equal to :value characters.",
  "validation.mac_address": "The :attribute field must be a valid MAC address.",
  "validation.max.array": "The :attribute field must not have more than :max items.",
  "validation.max.file": "The :attribute field must not be greater than :max kilobytes.",
  "validation.max.numeric": "The :attribute field must not be greater than :max.",
  "validation.max.string": "The :attribute field must not be greater than :max characters.",
  "validation.max_digits": "The :attribute field must not have more than :max digits.",
  "validation.mimes": "The :attribute field must be a file of type: :values.",
  "validation.mimetypes": "The :attribute field must be a file of type: :values.",
  "validation.min.array": "The :attribute field must have at least :min items.",
  "validation.min.file": "The :attribute field must be at least :min kilobytes.",
  "validation.min.numeric": "The :attribute field must be at least :min.",
  "validation.min.string": "The :attribute field must be at least :min characters.",
  "validation.min_digits": "The :attribute field must have at least :min digits.",
  "validation.missing": "The :attribute field must be missing.",
  "validation.missing_if": "The :attribute field must be missing when :other is :value.",
  "validation.missing_unless": "The :attribute field must be missing unless :other is :value.",
  "validation.missing_with": "The :attribute field must be missing when :values is present.",
  "validation.missing_with_all": "The :attribute field must be missing when :values are present.",
  "validation.multiple_of": "The :attribute field must be a multiple of :value.",
  "validation.not_in": "The selected :attribute is invalid.",
  "validation.not_regex": "The :attribute field format is invalid.",
  "validation.numeric": "The :attribute field must be a number.",
  "validation.password.letters": "The :attribute field must contain at least one letter.",
  "validation.password.mixed": "The :attribute field must contain at least one uppercase and one lowercase letter.",
  "validation.password.numbers": "The :attribute field must contain at least one number.",
  "validation.password.symbols": "The :attribute field must contain at least one symbol.",
  "validation.password.uncompromised": "The given :attribute has appeared in a data leak. Please choose a different :attribute.",
  "validation.present": "The :attribute field must be present.",
  "validation.present_if": "The :attribute field must be present when :other is :value.",
  "validation.present_unless": "The :attribute field must be present unless :other is :value.",
  "validation.present_with": "The :attribute field must be present when :values is present.",
  "validation.present_with_all": "The :attribute field must be present when :values are present.",
  "validation.prohibited": "The :attribute field is prohibited.",
  "validation.prohibited_if": "The :attribute field is prohibited when :other is :value.",
  "validation.prohibited_if_accepted": "The :attribute field is prohibited when :other is accepted.",
  "validation.prohibited_if_declined": "The :attribute field is prohibited when :other is declined.",
  "validation.prohibited_unless": "The :attribute field is prohibited unless :other is in :values.",
  "validation.prohibits": "The :attribute field prohibits :other from being present.",
  "validation.regex": "The :attribute field format is invalid.",
  "validation.required": "The :attribute field is required.",
  "validation.required_array_keys": "The :attribute field must contain entries for: :values.",
  "validation.required_if": "The :attribute field is required when :other is :value.",
  "validation.required_if_accepted": "The :attribute field is required when :other is accepted.",
  "validation.required_if_declined": "The :attribute field is required when :other is declined.",
  "validation.required_unless": "The :attribute field is required unless :other is in :values.",
  "validation.required_with": "The :attribute field is required when :values is present.",
  "validation.required_with_all": "The :attribute field is required when :values are present.",
  "validation.required_without": "The :attribute field is required when :values is not present.",
  "validation.required_without_all": "The :attribute field is required when none of :values are present.",
  "validation.same": "The :attribute field must match :other.",
  "validation.size.array": "The :attribute field must contain :size items.",
  "validation.size.file": "The :attribute field must be :size kilobytes.",
  "validation.size.numeric": "The :attribute field must be :size.",
  "validation.size.string": "The :attribute field must be :size characters.",
  "validation.starts_with": "The :attribute field must start with one of the following: :values.",
  "validation.string": "The :attribute field must be a string.",
  "validation.timezone": "The :attribute field must be a valid timezone.",
  "validation.unique": "The :attribute has already been taken.",
  "validation.uploaded": "The :attribute failed to upload.",
  "validation.uppercase": "The :attribute field must be uppercase.",
  "validation.url": "The :attribute field must be a valid URL.",
  "validation.ulid": "The :attribute field must be a valid ULID.",
  "validation.uuid": "The :attribute field must be a valid UUID.",
  "validation.custom.attribute-name.rule-name": "custom-message",
  "actions.filter": "Filter",
  "actions.apply_filter": "Apply Filter",
  "actions.search": "Search ...",
  "actions.pagination_showing": "Showing :from to :to of :total entries",
  "actions.mode.light": "Light",
  "actions.mode.dark": "Dark",
  "actions.mode.system": "System",
  "admins.plural": "Admins",
  "admins.singular": "Admin",
  "admins.tracking": "Tracking Admins",
  "admins.tracking_note": "Keep track Admins inside the app in one place",
  "admins.all": "All",
  "admins.recently": "Recently Added",
  "admins.search": "Search",
  "admins.empty": "There are no admins",
  "admins.select": "Select Admin",
  "admins.trashed": "Trashed Admins",
  "admins.perPage": "Count Results Per Page",
  "admins.my_profile": "My Profile",
  "admins.profile": "Profile",
  "admins.edit_profile": "Edit Profile",
  "admins.about": "About",
  "admins.contacts": "Contacts",
  "admins.tabs.details": "Profile Details",
  "admins.tabs.password": "Change Password",
  "admins.types.APP_USER": "App User",
  "admins.types.USER": "User",
  "admins.types.ADMIN": "User",
  "admins.actions.list": "List Admins",
  "admins.actions.show": "Show Admin",
  "admins.actions.create": "Add New Admin",
  "admins.actions.new": "New",
  "admins.actions.edit": "Edit Admin",
  "admins.actions.delete": "Delete Admin",
  "admins.actions.restore": "Restore",
  "admins.actions.forceDelete": "Force Delete",
  "admins.actions.save": "Save",
  "admins.actions.filter": "Filter",
  "admins.actions.delete-account": "Delete Account",
  "admins.actions.avatar.upload": "Upload Picture",
  "admins.actions.avatar.reset": "Reset",
  "admins.messages.created": "The admin has been created successfully.",
  "admins.messages.updated": "The admin has been updated successfully.",
  "admins.messages.profile-updated": "Your profile has been updated successfully.",
  "admins.messages.deleted": "The admin has been deleted successfully.",
  "admins.messages.restored": "The admin has been restored successfully.",
  "admins.attributes.name": "Name",
  "admins.attributes.phone": "Phone",
  "admins.attributes.email": "Email",
  "admins.attributes.created_at": "Date Joined",
  "admins.attributes.password": "Password",
  "admins.attributes.password_confirmation": "Confirm Password",
  "admins.attributes.current_password": "Current Password",
  "admins.attributes.new_password": "New Password",
  "admins.attributes.type": "Admin Type",
  "admins.attributes.role": "Role",
  "admins.attributes.last_active": "Last Active",
  "admins.attributes.language": "Language",
  "admins.attributes.avatar": "Profile Picture",
  "admins.attributes.actions": "Actions",
  "admins.notes.avatar": "Allowed JPG, JPEG, GIF or PNG.",
  "admins.delete-account.confirm-title": "Are you sure you want to delete your account?",
  "admins.delete-account.confirm-info": "Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.",
  "admins.delete-account.confirm-check": "I confirm my account deactivation",
  "admins.delete-account.confirm": "Deactivate Account",
  "admins.dialogs.delete.title": "Warning !",
  "admins.dialogs.delete.info": "Are you sure you want to delete the admin ?",
  "admins.dialogs.delete.confirm": "Delete",
  "admins.dialogs.delete.cancel": "Cancel",
  "admins.dialogs.restore.title": "Warning !",
  "admins.dialogs.restore.info": "Are you sure you want to restore the admin ?",
  "admins.dialogs.restore.confirm": "Restore",
  "admins.dialogs.restore.cancel": "Cancel",
  "admins.dialogs.forceDelete.title": "Warning !",
  "admins.dialogs.forceDelete.info": "Are you sure you want to force delete the admin ?",
  "admins.dialogs.forceDelete.confirm": "Force",
  "admins.dialogs.forceDelete.cancel": "Cancel",
  "auth.logout": "Log Out",
  "auth.register.page_title": "Register",
  "auth.register.title": "Adventure starts here 🚀",
  "auth.register.subtitle": "Make your app management easy and fun!",
  "auth.register.have_account": "Already have an account?",
  "auth.register.actions.submit": "Sign up",
  "auth.register.actions.login": "Sign in instead",
  "auth.register.actions.login-note": "Already have an account?",
  "auth.register.attributes.name": "Name",
  "auth.register.attributes.email": "Email",
  "auth.register.attributes.phone": "Phone Number",
  "auth.register.attributes.password": "Password",
  "auth.register.attributes.password_confirmation": "Confirm Password",
  "auth.register.attributes.remember": "Remember me",
  "auth.login.page_title": "Login",
  "auth.login.title": "Welcome to :app 👋",
  "auth.login.subtitle": "Please sign-in to your account and start the adventure",
  "auth.login.actions.submit": "Sign in",
  "auth.login.actions.forget": "Forget Password",
  "auth.login.actions.register": "Sign up",
  "auth.login.actions.register-note": "Don't have an account yet?",
  "auth.login.attributes.email": "Email",
  "auth.login.attributes.password": "Password",
  "auth.login.attributes.remember": "Remember me",
  "auth.forget_password.page_title": "Forgot Password",
  "auth.forget_password.title": "Forgot Password? 🔒",
  "auth.forget_password.subtitle": "Enter your email and we'll send you instructions to reset your password",
  "auth.forget_password.actions.submit": "Send Reset Link",
  "auth.forget_password.actions.login": "Back to login",
  "auth.forget_password.attributes.email": "Email",
  "auth.reset_password.page_title": "Reset Password",
  "auth.reset_password.title": "Reset Password 🔒",
  "auth.reset_password.for": "for",
  "auth.reset_password.actions.submit": "Set new password",
  "auth.reset_password.actions.login": "Back to login",
  "auth.reset_password.notifications.otp": "Your OTP for :app reset password is: :code expires at :expireAt",
  "auth.reset_password.attributes.email": "Email",
  "auth.reset_password.attributes.password": "New Password",
  "auth.reset_password.attributes.password_confirmation": "Confirm Password",
  "auth.verify_email.page_title": "Verify Email",
  "auth.verify_email.title": "Verify your email ✉️",
  "auth.verify_email.subtitle": "Please verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will send you another.",
  "auth.verify_email.messages.sent": "A new verification link has been sent to the email address you provided during registration.",
  "auth.verify_email.actions.send": "Resend verification link",
  "auth.confirm_password.page_title": "Confirm Password",
  "auth.confirm_password.title": "Confirm Password 🔒",
  "auth.confirm_password.subtitle": "This is a secure area of the application. Please confirm your password before continuing.",
  "auth.confirm_password.actions.submit": "Confirm",
  "auth.verify.title": "Verify phone number 💬",
  "auth.verify.sub-title": "We sent a verification code to your mobile. Enter the code from the mobile in the field below.",
  "auth.verify.attributes.otp": "Type your 4 digit security code",
  "auth.verify.attributes.submit": "Verify my account",
  "auth.verify.actions.resend-note": "Didn't get the code?",
  "auth.verify.actions.resend": "Resend",
  "auth.verify.actions.logout-note": "or sign in with another account",
  "auth.verify.actions.logout": "Logout",
  "auth.verify.messages.already-verified": "Your phone number is already verified.",
  "auth.verify.messages.sent": "We sent a verification code to your mobile",
  "auth.verify.messages.resent": "The OTP has been resent successfully.",
  "auth.verify.notifications.otp": "Your OTP for :app registration is: :code expires at :expireAt",
  "auth.verify.validation.otp.exists": "Invalid OTP",
  "auth.verify.validation.otp.rate-limit": "You may try again in :seconds seconds.",
  "dashboard.home": "Dashboard",
  "settings.title": "Settings",
  "settings.note.mail.title": "Note",
  "settings.note.mail.body": "These credentials are only used for the SMTP mailer.",
  "settings.tabs.main": "Main Settings",
  "settings.tabs.mail": "Mail Credentials",
  "settings.tabs.sms": "SMS Credentials",
  "settings.actions.save": "Save",
  "settings.actions.logo.upload": "Upload Logo",
  "settings.actions.logo.reset": "Reset",
  "settings.actions.favicon.upload": "Upload Favicon",
  "settings.actions.favicon.reset": "Reset",
  "settings.messages.updated": "The application settings has been updated successfully.",
  "settings.attributes.APP_NAME": "App Name",
  "settings.attributes.%APP_NAME%": "App Name",
  "settings.attributes.APP_COPYRIGHT": "Copyright",
  "settings.attributes.%APP_COPYRIGHT%": "Copyright",
  "settings.attributes.APP_LOCALE": "Default Language",
  "settings.attributes.LOGO": "Logo",
  "settings.attributes.FAVICON": "Favicon",
  "settings.attributes.MAIL_HOST": "Host",
  "settings.attributes.MAIL_PORT": "Port",
  "settings.attributes.MAIL_USERNAME": "Username",
  "settings.attributes.MAIL_PASSWORD": "Password",
  "settings.attributes.MAIL_FROM_NAME": "From Name",
  "settings.attributes.MAIL_FROM_ADDRESS": "From Address",
  "settings.attributes.SMS_ENABLED": "Enable SMS",
  "settings.attributes.SMS_ENDPOINT": "Endpoint",
  "settings.attributes.SMS_API_KEY": "Api Key",
  "settings.notes.LOGO": "Main logo for your site (PNG recommended)",
  "settings.notes.FAVICON": "Site icon for browser tab (32×32px)",
  "settings.notes.MAIL_PORT": "Enter a valid SMTP port number between (1 - 65535)",
  "sidebar.overview": "Overview",
  "sidebar.analytics": "Analytics",
  "sidebar.app_users": "App Users",
  "sidebar.app_admins": "App Admins",
  "sidebar.services": "Services",
  "sidebar.pois": "POIs",
  "sidebar.poi_requests": "POI Requests",
  "sidebar.business_requests": "Business Requests",
  "users.plural": "Users",
  "users.singular": "User",
  "users.tracking": "Tracking Users",
  "users.tracking_note": "Keep track of users inside the app in one place",
  "users.all": "All",
  "users.recently": "Recently Added",
  "users.search": "Search",
  "users.empty": "There are no users",
  "users.select": "Select User",
  "users.trashed": "Trashed Users",
  "users.perPage": "Count Results Per Page",
  "users.my_profile": "My Profile",
  "users.profile": "Profile",
  "users.edit_profile": "Edit Profile",
  "users.about": "About",
  "users.contacts": "Contacts",
  "users.tabs.details": "Profile Details",
  "users.tabs.password": "Change Password",
  "users.types.APP_USER": "App User",
  "users.types.USER": "User",
  "users.types.ADMIN": "Admin",
  "users.actions.list": "List Users",
  "users.actions.show": "Show User",
  "users.actions.create": "Add New User",
  "users.actions.new": "New",
  "users.actions.edit": "Edit User",
  "users.actions.delete": "Delete User",
  "users.actions.delete_selected": "Delete Selected Users",
  "users.actions.restore": "Restore",
  "users.actions.forceDelete": "Force Delete",
  "users.actions.save": "Save",
  "users.actions.filter": "Filter",
  "users.actions.delete-account": "Delete Account",
  "users.actions.avatar.upload": "Upload Picture",
  "users.actions.avatar.reset": "Reset",
  "users.messages.created": "The user has been created successfully.",
  "users.messages.updated": "The user has been updated successfully.",
  "users.messages.profile-updated": "Your profile has been updated successfully.",
  "users.messages.deleted": "The user has been deleted successfully.",
  "users.messages.restored": "The user has been restored successfully.",
  "users.attributes.name": "Name",
  "users.attributes.phone": "Phone",
  "users.attributes.email": "Email",
  "users.attributes.created_at": "Date Joined",
  "users.attributes.password": "Password",
  "users.attributes.password_confirmation": "Confirm Password",
  "users.attributes.current_password": "Current Password",
  "users.attributes.new_password": "New Password",
  "users.attributes.type": "User Type",
  "users.attributes.role": "Role",
  "users.attributes.last_active": "Last Active",
  "users.attributes.language": "Language",
  "users.attributes.avatar": "Profile Picture",
  "users.attributes.actions": "Actions",
  "users.notes.avatar": "Allowed JPG, JPEG, GIF or PNG.",
  "users.delete-account.confirm-title": "Are you sure you want to delete your account?",
  "users.delete-account.confirm-info": "Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.",
  "users.delete-account.confirm-check": "I confirm my account deactivation",
  "users.delete-account.confirm": "Deactivate Account",
  "users.dialogs.delete.title": "Warning!",
  "users.dialogs.delete.info": "Are you sure you want to delete the user?",
  "users.dialogs.delete.confirm": "Delete",
  "users.dialogs.delete.cancel": "Cancel",
  "users.dialogs.restore.title": "Warning!",
  "users.dialogs.restore.info": "Are you sure you want to restore the user?",
  "users.dialogs.restore.confirm": "Restore",
  "users.dialogs.restore.cancel": "Cancel",
  "users.dialogs.forceDelete.title": "Warning!",
  "users.dialogs.forceDelete.info": "Are you sure you want to permanently delete the user?",
  "users.dialogs.forceDelete.confirm": "Force Delete",
  "users.dialogs.forceDelete.cancel": "Cancel"
};
const __vite_glob_1_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: php_en
}, Symbol.toStringTag, { value: "Module" }));
let token = null;
if (typeof document !== "undefined") {
  const meta = document.head.querySelector('meta[name="csrf-token"]');
  token = meta ? meta.getAttribute("content") : null;
}
const axiosInstance = axios.create({
  baseURL: "",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
    "X-ACCEPT-LANGUAGE": typeof Locale !== "undefined" && Locale.getCode ? Locale.getCode() : "en",
    "X-CSRF-TOKEN": token || ""
  },
  withCredentials: true
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
if (typeof window !== "undefined") {
  window.axios = axiosInstance;
}
const auth = {
  namespaced: true,
  state() {
    return {
      authUser: null
    };
  },
  mutations: {
    SET_AUTH_USER(state, data) {
      state.authUser = data;
      state.error = null;
    },
    CLEAR_AUTH_USER(state) {
      state.authUser = null;
    }
  },
  getters: {
    getAuthUser: (state) => state.authUser,
    getError: (state) => state.error
  },
  actions: {
    /**
     * Fetch the authenticated user from the API.
     * @param {Object} context - Vuex action context
     * @param {Object} [payload] - Optional payload, e.g. { force: true }
     */
    async fetchAuthUser({ state, commit }, payload = {}) {
      try {
        const { data } = await axiosInstance.get("/api/profile");
        commit("SET_AUTH_USER", data.data);
        return data.data;
      } catch (error) {
        commit("SET_AUTH_USER", null);
        throw error;
      }
    },
    async logout({ commit }) {
      await axiosInstance.post("/logout");
      commit("CLEAR_AUTH_USER");
    }
  }
};
const store = createStore({
  modules: {
    auth
  }
});
const Auth = {
  install: (app, options) => {
    app.config.globalProperties.$auth = {
      user() {
        return app.config.globalProperties.$store.getters["auth/getAuthUser"];
      },
      check() {
        return !!this.user();
      },
      async fetch() {
        return await app.config.globalProperties.$store.dispatch("auth/fetchAuthUser");
      },
      async logout() {
        return await app.config.globalProperties.$store.dispatch("auth/logout").finally(() => location.href = "/");
      }
    };
    app.mixin({
      computed: {
        $auth() {
          return app.config.globalProperties.$auth;
        }
      }
    });
  }
};
const _sfc_main$7 = /* @__PURE__ */ Object.assign({ name: "SidebarHead" }, {
  __name: "SidebarHead",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<li${ssrRenderAttrs(mergeProps({ class: "menu-header small text-uppercase" }, _attrs))}><span class="menu-header-text">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span></li>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Dashboard/SidebarHead.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ Object.assign({ name: "SidebarLink" }, {
  __name: "SidebarLink",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      required: false,
      default: "link"
    },
    href: {
      type: String,
      required: false,
      default: "#"
    },
    label: {
      type: String,
      required: true
    },
    iconClass: {
      type: String,
      required: false
    },
    active: {
      type: Boolean,
      required: false,
      default: false
    },
    badge: {
      type: Number,
      required: false,
      default: 0
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<li${ssrRenderAttrs(mergeProps({
        class: ["menu-item", { "active open": __props.active && __props.type === "dropdown", active: __props.active && __props.type === "link" }]
      }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Link), {
        href: __props.href,
        class: ["menu-link", { "menu-toggle": __props.type === "dropdown" }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.iconClass) {
              _push2(`<i class="${ssrRenderClass([__props.iconClass, "menu-icon tf-icons"])}"${_scopeId}></i>`);
            } else {
              _push2(`<!---->`);
            }
            ssrRenderSlot(_ctx.$slots, "svg", {}, null, _push2, _parent2, _scopeId);
            _push2(`<div class="text-truncate"${_scopeId}>${ssrInterpolate(__props.label)}</div>`);
            if (__props.badge > 0) {
              _push2(`<span${ssrRenderAttr("title", __props.badge > 99 ? __props.badge : "")} class="badge bg-label-danger ms-auto"${_scopeId}>${ssrInterpolate(__props.badge > 99 ? "+99" : __props.badge)}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              __props.iconClass ? (openBlock(), createBlock("i", {
                key: 0,
                class: ["menu-icon tf-icons", __props.iconClass]
              }, null, 2)) : createCommentVNode("", true),
              renderSlot(_ctx.$slots, "svg"),
              createVNode("div", { class: "text-truncate" }, toDisplayString(__props.label), 1),
              __props.badge > 0 ? (openBlock(), createBlock("span", {
                key: 1,
                title: __props.badge > 99 ? __props.badge : "",
                class: "badge bg-label-danger ms-auto"
              }, toDisplayString(__props.badge > 99 ? "+99" : __props.badge), 9, ["title"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<ul class="menu-sub">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</ul></li>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Dashboard/SidebarLink.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ Object.assign({ name: "UserGroupIcon" }, {
  __name: "UserGroupIcon",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${ssrRenderAttrs(mergeProps(_ctx.$attrs, {
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      }, _attrs))}><path d="M20.774 18C21.5233 18 22.1193 17.5285 22.6545 16.8691C23.7499 15.5194 21.9513 14.4408 21.2654 13.9126C20.568 13.3756 19.7894 13.0714 19 13M18 11C19.3807 11 20.5 9.88071 20.5 8.5C20.5 7.11929 19.3807 6 18 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path d="M3.22596 18C2.47666 18 1.88067 17.5285 1.34555 16.8691C0.250089 15.5194 2.04867 14.4408 2.73465 13.9126C3.43197 13.3756 4.21058 13.0714 5 13M5.5 11C4.11929 11 3 9.88071 3 8.5C3 7.11929 4.11929 6 5.5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path d="M8.0838 15.1112C7.06203 15.743 4.38299 17.0331 6.0147 18.6474C6.81178 19.436 7.69952 20 8.81563 20H15.1844C16.3005 20 17.1882 19.436 17.9853 18.6474C19.617 17.0331 16.938 15.743 15.9162 15.1112C13.5201 13.6296 10.4799 13.6296 8.0838 15.1112Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15.5 7.5C15.5 9.433 13.933 11 12 11C10.067 11 8.5 9.433 8.5 7.5C8.5 5.567 10.067 4 12 4C13.933 4 15.5 5.567 15.5 7.5Z" stroke="currentColor" stroke-width="1.5"></path></svg>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Svgs/UserGroupIcon.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ Object.assign({ name: "PoisIcon" }, {
  __name: "PoisIcon",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${ssrRenderAttrs(mergeProps(_ctx.$attrs, {
        viewBox: "0 0 21 21",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      }, _attrs))}><path fill-rule="evenodd" clip-rule="evenodd" d="M10.2764 2.6149L13.0789 4.0173C13.2749 4.11539 13.3949 4.17411 13.4787 4.21103L13.4896 4.21094C13.6 4.21094 13.7037 4.23956 13.7937 4.28979C13.8849 4.29533 14.0209 4.29672 14.2574 4.29672L16.0339 4.29672C16.7818 4.29669 17.4072 4.29667 17.904 4.36538C18.4304 4.43819 18.9041 4.59857 19.2829 4.9882C19.6593 5.37536 19.812 5.85535 19.8816 6.38835C19.948 6.89583 19.9479 7.53599 19.9479 8.30789V9.0026C19.9479 9.34778 19.6681 9.6276 19.3229 9.6276C18.9777 9.6276 18.6979 9.34778 18.6979 9.0026V8.35051C18.6979 7.52515 18.6967 6.96727 18.6422 6.55035C18.5898 6.14965 18.4984 5.97449 18.3866 5.85952C18.2773 5.74701 18.114 5.65633 17.7328 5.6036C17.3316 5.54812 16.7934 5.54672 15.9896 5.54672L14.1146 5.54673V8.58594C14.1146 8.93111 13.8348 9.21094 13.4896 9.21094C13.1444 9.21094 12.8646 8.93111 12.8646 8.58594V5.30495C12.7703 5.26083 12.6721 5.21158 12.566 5.15846L9.74312 3.74581C9.15321 3.45061 8.74868 3.24888 8.4153 3.11943C8.36838 3.10121 8.32379 3.08481 8.28125 3.0701L8.28125 14.2684C8.7005 14.3437 9.08486 14.5042 9.4219 14.6701C9.60754 14.7614 9.78827 14.8593 9.95574 14.9504L9.98083 14.964C10.1422 15.0518 10.2904 15.1324 10.4359 15.2052C10.7446 15.3597 10.8696 15.7351 10.7152 16.0438C10.5607 16.3525 10.1852 16.4775 9.87656 16.323C9.71138 16.2404 9.54585 16.1504 9.38955 16.0653L9.35867 16.0486C9.18963 15.9567 9.02978 15.8703 8.86996 15.7916C8.54777 15.6331 8.26267 15.5251 7.99187 15.4879C7.37199 15.4027 6.86595 15.6982 6.08851 16.1521L6.04165 16.1794C5.52587 16.4806 5.0972 16.7308 4.7422 16.8921C4.38323 17.0552 3.99291 17.1797 3.58077 17.1057C3.1353 17.0257 2.73623 16.785 2.45363 16.4322C2.19485 16.1091 2.10887 15.7094 2.06987 15.3108C2.03123 14.9158 2.03124 14.4105 2.03125 13.7987V6.88946C2.03124 6.42695 2.03123 6.03616 2.06243 5.71249C2.09554 5.3691 2.16711 5.05259 2.33872 4.74942C2.51086 4.44532 2.74501 4.22287 3.02207 4.02151C3.28178 3.83278 3.6136 3.63907 4.00367 3.41135L5.0775 2.78443C5.61668 2.46963 6.05835 2.21177 6.44244 2.03324C6.84414 1.84652 7.22406 1.72603 7.64617 1.71225C8.06836 1.69847 8.45513 1.79396 8.86777 1.9542C9.26221 2.10736 9.71898 2.33594 10.2764 2.6149ZM6.96932 3.16677C6.99043 3.15696 7.01106 3.14757 7.03125 3.13858L7.03125 14.3264C6.47105 14.4756 5.98624 14.7615 5.57585 15.0034C5.52998 15.0305 5.48504 15.0569 5.44103 15.0826C4.88805 15.4055 4.51482 15.6225 4.22512 15.7541C3.93261 15.887 3.83148 15.8808 3.80174 15.8754C3.65913 15.8498 3.52629 15.7719 3.42931 15.6508C3.40287 15.6178 3.34625 15.5194 3.31393 15.1891C3.28197 14.8623 3.28125 14.4188 3.28125 13.7657V6.91821C3.28125 6.41931 3.28192 6.08908 3.30666 5.83245C3.33015 5.58887 3.37177 5.46193 3.42653 5.36519C3.48076 5.26938 3.56566 5.1717 3.75694 5.03269C3.95995 4.88515 4.23695 4.72259 4.65935 4.47599L5.68257 3.87861C6.25305 3.54555 6.64446 3.31777 6.96932 3.16677Z" fill="currentColor"></path><path d="M15.5729 13.5859C15.1127 13.5859 14.7396 13.959 14.7396 14.4193C14.7396 14.8795 15.1127 15.2526 15.5729 15.2526H15.5804C16.0406 15.2526 16.4137 14.8795 16.4137 14.4193C16.4137 13.959 16.0406 13.5859 15.5804 13.5859H15.5729Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M11.5341 12.665C12.2226 11.0555 13.8608 10.0443 15.5729 10.0443C17.2851 10.0443 18.9233 11.0555 19.6118 12.665C20.2551 14.1691 19.899 15.4601 19.1904 16.5334C18.6141 17.4064 17.7709 18.1829 17.0441 18.8521C16.9163 18.9697 16.7922 19.0841 16.6737 19.195C16.3752 19.4745 15.9802 19.6276 15.5729 19.6276C15.1657 19.6276 14.7707 19.4745 14.4722 19.1951L14.4709 19.1938C14.3459 19.0761 14.2145 18.9546 14.0791 18.8295C13.3596 18.1645 12.5273 17.3953 11.9569 16.5332C11.2474 15.4608 10.89 14.1709 11.5341 12.665ZM15.5729 11.2943C14.3331 11.2943 13.1643 12.0323 12.6834 13.1566C12.2462 14.1787 12.4568 15.0234 12.9994 15.8434C13.4785 16.5677 14.1765 17.2145 14.8975 17.8827C15.0403 18.0151 15.184 18.1483 15.3271 18.2831C15.39 18.3417 15.4778 18.3776 15.5729 18.3776C15.6683 18.3776 15.7563 18.3415 15.8193 18.2826C15.9532 18.1572 16.0878 18.033 16.2216 17.9094C16.9528 17.2342 17.6628 16.5786 18.1472 15.8448C18.6893 15.0237 18.8991 14.1773 18.4625 13.1566C17.9816 12.0323 16.8128 11.2943 15.5729 11.2943Z" fill="currentColor"></path></svg>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Svgs/PoisIcon.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ Object.assign({ name: "PoiRequestsIcon" }, {
  __name: "PoiRequestsIcon",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${ssrRenderAttrs(mergeProps(_ctx.$attrs, {
        viewBox: "0 0 21 21",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      }, _attrs))}><path fill-rule="evenodd" clip-rule="evenodd" d="M3.08044 17.1389C3.16628 17.1539 3.25045 17.1614 3.33545 17.1614L3.33459 17.1597C3.91376 17.1597 4.5121 16.8097 5.57043 16.1906L5.67794 16.1272L5.68311 16.1242C6.32008 15.7513 6.87045 15.4291 7.49044 15.5147C7.9396 15.5764 8.41962 15.8381 8.88379 16.0914L8.91505 16.1085C9.06523 16.1907 9.21955 16.2751 9.37459 16.3522C9.68293 16.5072 10.0588 16.3822 10.2138 16.0739C10.3688 15.7647 10.2438 15.3897 9.93547 15.2347C9.79597 15.165 9.65418 15.0877 9.50514 15.0065L9.4821 14.9939C8.97731 14.7188 8.40854 14.4088 7.78044 14.2954V3.06877C8.12198 3.18721 8.56503 3.40646 9.24292 3.7464L12.0188 5.13891C12.1511 5.20535 12.2637 5.26116 12.3638 5.30801V9.85305C12.3638 10.198 12.6438 10.478 12.9888 10.478C13.3338 10.478 13.6138 10.198 13.6138 9.85305V5.55194C13.6591 5.55216 13.7068 5.55224 13.7571 5.55224H15.4896C16.9404 5.55224 17.5937 5.56474 17.8862 5.86641C18.1979 6.18641 18.1979 6.95974 18.1979 8.36307V10.7414C18.1979 11.0864 18.4779 11.3664 18.8229 11.3664C19.1679 11.3664 19.4479 11.0864 19.4479 10.7414V8.36307C19.4479 6.63328 19.4479 5.6797 18.783 4.99558C18.1105 4.30225 17.1796 4.30224 15.4896 4.30224H13.7571C13.3443 4.30224 12.9518 4.20891 12.5796 4.02224L9.8029 2.62974C8.59123 2.02224 7.92209 1.68724 7.14543 1.71224C6.37232 1.73721 5.72968 2.11288 4.5652 2.79362L3.52629 3.40141L3.5204 3.40487C2.63495 3.92435 2.14644 4.21095 1.83879 4.75641C1.53129 5.30058 1.53125 5.87891 1.53125 6.92891V13.7914C1.53125 15.2181 1.53125 15.9347 1.95292 16.4639C2.23625 16.8189 2.63628 17.0581 3.08044 17.1389ZM6.53044 3.13866C6.19404 3.28829 5.77593 3.53254 5.1921 3.8739L4.16044 4.47724C3.38461 4.9314 3.0646 5.12474 2.92794 5.36891C2.7871 5.61808 2.78125 6.00307 2.78125 6.92724V13.7897C2.78125 14.7422 2.78127 15.4956 2.92961 15.6814C3.02377 15.7997 3.15708 15.8797 3.30208 15.9064C3.51571 15.9445 4.13497 15.5819 4.92194 15.1211L4.93709 15.1122L5.04626 15.0489C5.4951 14.7857 5.98046 14.5013 6.53044 14.3533V3.13866Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M18.3428 19.4439C18.4644 19.5647 18.6236 19.6247 18.7819 19.6247V19.6239C18.9427 19.6239 19.1036 19.5614 19.2261 19.438C19.4686 19.1922 19.4669 18.7964 19.2211 18.5539L18.0936 17.4397C18.5094 16.8539 18.7545 16.138 18.7545 15.3655C18.7545 13.3847 17.1436 11.773 15.1628 11.773C13.1819 11.773 11.5703 13.3847 11.5703 15.3655C11.5703 17.3464 13.1819 18.958 15.1628 18.958C15.9211 18.958 16.6252 18.7222 17.2052 18.3197L18.3428 19.4439ZM12.8203 15.3664C12.8203 14.0747 13.8711 13.0239 15.1628 13.0239C16.4536 13.0239 17.5045 14.0747 17.5045 15.3664C17.5045 16.658 16.4544 17.7089 15.1628 17.7089C13.8711 17.7089 12.8203 16.658 12.8203 15.3664Z" fill="currentColor"></path></svg>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Svgs/PoiRequestsIcon.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ Object.assign({ name: "PoiRequestsIcon" }, {
  __name: "BusinessRequestsIcon",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${ssrRenderAttrs(mergeProps(_ctx.$attrs, {
        viewBox: "0 0 21 21",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      }, _attrs))}><path d="M14.4479 9.83594C14.4479 9.49076 14.7277 9.21094 15.0729 9.21094H15.9062C16.2514 9.21094 16.5312 9.49076 16.5312 9.83594C16.5312 10.1811 16.2514 10.4609 15.9062 10.4609H15.0729C14.7277 10.4609 14.4479 10.1811 14.4479 9.83594Z" fill="currentColor"></path><path d="M14.4479 13.1693C14.4479 12.8241 14.7277 12.5443 15.0729 12.5443H15.9062C16.2514 12.5443 16.5312 12.8241 16.5312 13.1693C16.5312 13.5144 16.2514 13.7943 15.9062 13.7943H15.0729C14.7277 13.7943 14.4479 13.5144 14.4479 13.1693Z" fill="currentColor"></path><path d="M5.07292 5.8776C4.72774 5.8776 4.44792 6.15743 4.44792 6.5026C4.44792 6.84778 4.72774 7.1276 5.07292 7.1276H5.90625C6.25143 7.1276 6.53125 6.84778 6.53125 6.5026C6.53125 6.15743 6.25143 5.8776 5.90625 5.8776H5.07292Z" fill="currentColor"></path><path d="M8.40625 5.8776C8.06107 5.8776 7.78125 6.15743 7.78125 6.5026C7.78125 6.84778 8.06107 7.1276 8.40625 7.1276H9.23958C9.58476 7.1276 9.86458 6.84778 9.86458 6.5026C9.86458 6.15743 9.58476 5.8776 9.23958 5.8776H8.40625Z" fill="currentColor"></path><path d="M5.07292 9.21094C4.72774 9.21094 4.44792 9.49076 4.44792 9.83594C4.44792 10.1811 4.72774 10.4609 5.07292 10.4609H5.90625C6.25143 10.4609 6.53125 10.1811 6.53125 9.83594C6.53125 9.49076 6.25143 9.21094 5.90625 9.21094H5.07292Z" fill="currentColor"></path><path d="M8.40625 9.21094C8.06107 9.21094 7.78125 9.49076 7.78125 9.83594C7.78125 10.1811 8.06107 10.4609 8.40625 10.4609H9.23958C9.58476 10.4609 9.86458 10.1811 9.86458 9.83594C9.86458 9.49076 9.58476 9.21094 9.23958 9.21094H8.40625Z" fill="currentColor"></path><path d="M5.07292 12.5443C4.72774 12.5443 4.44792 12.8241 4.44792 13.1693C4.44792 13.5144 4.72774 13.7943 5.07292 13.7943H5.90625C6.25143 13.7943 6.53125 13.5144 6.53125 13.1693C6.53125 12.8241 6.25143 12.5443 5.90625 12.5443H5.07292Z" fill="currentColor"></path><path d="M8.40625 12.5443C8.06107 12.5443 7.78125 12.8241 7.78125 13.1693C7.78125 13.5144 8.06107 13.7943 8.40625 13.7943H9.23958C9.58476 13.7943 9.86458 13.5144 9.86458 13.1693C9.86458 12.8241 9.58476 12.5443 9.23958 12.5443H8.40625Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.20198 1.71094H7.11052C5.97087 1.71092 5.05226 1.71091 4.32979 1.80804C3.5797 1.90889 2.94814 2.12463 2.44654 2.62623C1.94495 3.12783 1.7292 3.75939 1.62835 4.50948C1.53122 5.23195 1.53123 6.15054 1.53125 7.2902V14.0483C1.53123 15.188 1.53122 16.1066 1.62835 16.8291C1.7292 17.5792 1.94495 18.2107 2.44654 18.7123C2.94814 19.2139 3.5797 19.4297 4.32979 19.5305C5.05227 19.6276 5.97087 19.6276 7.11053 19.6276L15.5329 19.6276C16.2816 19.6276 16.906 19.6277 17.4016 19.561C17.9248 19.4907 18.3971 19.336 18.7767 18.9564C19.1563 18.5768 19.311 18.1045 19.3813 17.5813C19.448 17.0857 19.4479 16.4614 19.4479 15.7126V10.6259C19.4479 9.87722 19.448 9.25285 19.3813 8.75721C19.311 8.23405 19.1563 7.76171 18.7767 7.38215C18.3971 7.0026 17.9248 6.84787 17.4016 6.77753C16.906 6.71089 16.2817 6.71091 15.5329 6.71094L12.7807 6.71094C12.7783 5.83442 12.7643 5.10526 12.6841 4.50948C12.5833 3.75939 12.3676 3.12783 11.866 2.62623C11.3644 2.12463 10.7328 1.90889 9.98271 1.80804C9.26024 1.71091 8.34163 1.71092 7.20198 1.71094ZM12.7813 7.96094V18.3776H15.4896C16.2929 18.3776 16.8326 18.3763 17.2351 18.3222C17.6196 18.2705 17.7842 18.1811 17.8928 18.0725C18.0014 17.9639 18.0908 17.7993 18.1425 17.4148C18.1966 17.0122 18.1979 16.4726 18.1979 15.6693V10.6693C18.1979 9.86593 18.1966 9.3263 18.1425 8.92377C18.0908 8.53922 18.0014 8.37463 17.8928 8.26604C17.7842 8.15744 17.6196 8.06809 17.2351 8.01639C16.8326 7.96227 16.2929 7.96094 15.4896 7.96094H12.7813ZM11.5313 7.29093C11.5312 6.11878 11.5289 5.29757 11.4453 4.67604C11.3631 4.06456 11.2127 3.74075 10.9821 3.51011C10.7514 3.27948 10.4276 3.12911 9.81615 3.04689C9.18669 2.96227 8.35243 2.96094 7.15625 2.96094C5.96007 2.96094 5.12581 2.96227 4.49635 3.04689C3.88487 3.12911 3.56106 3.27948 3.33043 3.51011C3.09979 3.74075 2.94942 4.06456 2.86721 4.67604C2.78258 5.3055 2.78125 6.13976 2.78125 7.33594V14.0026C2.78125 15.1988 2.78258 16.033 2.86721 16.6625C2.94942 17.274 3.09979 17.5978 3.33043 17.8284C3.56106 18.0591 3.88487 18.2094 4.49635 18.2917C5.12581 18.3763 5.96007 18.3776 7.15625 18.3776H11.5313V7.33594C11.5313 7.32088 11.5313 7.30588 11.5313 7.29093Z" fill="currentColor"></path></svg>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Svgs/BusinessRequestsIcon.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{ name: "SidebarItems" },
  __name: "SidebarItems",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<ul${ssrRenderAttrs(mergeProps({ class: "menu-inner py-1" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$7, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("sidebar.overview"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("sidebar.overview")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$6, {
        label: _ctx.$t("users.plural"),
        href: unref(route)("dashboard.users.index"),
        active: ["Dashboard/Users/Index"].includes(unref(page).component)
      }, {
        svg: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$5, {
              width: "20",
              height: "20",
              class: "me-2"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$5, {
                width: "20",
                height: "20",
                class: "me-2"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$7, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("sidebar.services"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("sidebar.services")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$6, {
        label: _ctx.$t("sidebar.pois"),
        href: unref(route)("dashboard.pois.index"),
        active: ["Dashboard/Pois/Index"].includes(unref(page).component)
      }, {
        svg: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$4, {
              width: "20",
              height: "20",
              class: "me-2"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$4, {
                width: "20",
                height: "20",
                class: "me-2"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$6, {
        label: _ctx.$t("sidebar.poi_requests"),
        href: unref(route)("dashboard.poi_requests.index"),
        active: ["Dashboard/PoiRequests/Index"].includes(unref(page).component)
      }, {
        svg: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, {
              width: "20",
              height: "20",
              class: "me-2"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$3, {
                width: "20",
                height: "20",
                class: "me-2"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$6, {
        label: _ctx.$t("sidebar.business_requests"),
        href: unref(route)("dashboard.business_requests.index"),
        active: ["Dashboard/BusinessRequests/Index"].includes(unref(page).component)
      }, {
        svg: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              width: "20",
              height: "20",
              class: "me-2"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                width: "20",
                height: "20",
                class: "me-2"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</ul>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Dashboard/SidebarItems.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "App",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    const locales2 = inject("$locales");
    const { theme, pageLoaded } = useTheme();
    const { breadcrumbs: breadcrumbs2 } = useBreadcrumbs();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(pageLoaded)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "layout-wrapper layout-content-navbar" }, _attrs))}><div class="layout-container"><aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme"><div class="app-brand demo"><a href="/" class="app-brand-link"><span class="app-brand-logo demo"><img src="http://aroundme4.test/storage/1/logo.png" class="mw-100" style="${ssrRenderStyle({ "height": "35px" })}" alt=""></span></a><a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto"><i class="bx bx-chevron-left bx-sm align-middle"></i></a></div><div class="menu-inner-shadow"></div>`);
        _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
        _push(`</aside><div class="layout-page"><nav class="layout-navbar container-fluid navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar"><div class="layout-menu-toggle navbar-nav align-items-xl-center me-xl-0 d-xl-none me-3"><a class="nav-item nav-link me-xl-4 px-0" href="javascript:void(0)"><i class="bx bx-menu bx-sm"></i></a></div><div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse"><ul class="navbar-nav align-items-center ms-auto flex-row"><li class="nav-item dropdown-language dropdown me-2 me-xl-0"><a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown"><i class="bx bx-globe bx-sm"></i></a><ul class="dropdown-menu dropdown-menu-end"><!--[-->`);
        ssrRenderList(unref(locales2).get(), (locale) => {
          _push(`<li><a class="${ssrRenderClass([{ active: unref(locales2).current().getCode() === locale.getCode() }, "dropdown-item"])}"${ssrRenderAttr("href", unref(route)("locale.change", locale.getCode()))}><span class="me-1 align-middle">${locale.getSvgFlag(20, 20) ?? ""}</span><span class="align-middle">${ssrInterpolate(locale.getName())}</span></a></li>`);
        });
        _push(`<!--]--></ul></li><li class="nav-item dropdown-shortcuts navbar-dropdown dropdown me-2 me-xl-0"><a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false"><i class="bx bx-grid-alt bx-sm"></i></a><div class="dropdown-menu dropdown-menu-end py-0"><div class="dropdown-menu-header border-bottom"><div class="dropdown-header d-flex align-items-center py-3"><h5 class="text-body mb-0 me-auto">Shortcuts</h5><a href="javascript:void(0)" class="dropdown-shortcuts-add text-body" data-bs-toggle="tooltip" data-bs-placement="top" title="Add shortcuts"><i class="bx bx-sm bx-plus-circle"></i></a></div></div><div class="dropdown-shortcuts-list scrollable-container"><div class="row row-bordered overflow-visible g-0"><div class="dropdown-shortcuts-item col"><span class="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2"><i class="bx bx-calendar fs-4"></i></span><a href="app-calendar.html" class="stretched-link">Calendar</a><small class="text-muted mb-0">Appointments</small></div><div class="dropdown-shortcuts-item col"><span class="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2"><i class="bx bx-food-menu fs-4"></i></span><a href="app-invoice-list.html" class="stretched-link">Invoice App</a><small class="text-muted mb-0">Manage Accounts</small></div></div><div class="row row-bordered overflow-visible g-0"><div class="dropdown-shortcuts-item col"><span class="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2"><i class="bx bx-user fs-4"></i></span><a href="app-user-list.html" class="stretched-link">User App</a><small class="text-muted mb-0">Manage Users</small></div><div class="dropdown-shortcuts-item col"><span class="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2"><i class="bx bx-check-shield fs-4"></i></span><a href="app-access-roles.html" class="stretched-link">Role Management</a><small class="text-muted mb-0">Permission</small></div></div><div class="row row-bordered overflow-visible g-0"><div class="dropdown-shortcuts-item col"><span class="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2"><i class="bx bx-pie-chart-alt-2 fs-4"></i></span><a href="index.html" class="stretched-link">Dashboard</a><small class="text-muted mb-0">User Profile</small></div><div class="dropdown-shortcuts-item col"><span class="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2"><i class="bx bx-cog fs-4"></i></span><a href="pages-account-settings-account.html" class="stretched-link">Setting</a><small class="text-muted mb-0">Account Settings</small></div></div><div class="row row-bordered overflow-visible g-0"><div class="dropdown-shortcuts-item col"><span class="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2"><i class="bx bx-help-circle fs-4"></i></span><a href="pages-faq.html" class="stretched-link">FAQs</a><small class="text-muted mb-0">FAQs &amp; Articles</small></div><div class="dropdown-shortcuts-item col"><span class="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2"><i class="bx bx-window-open fs-4"></i></span><a href="modal-examples.html" class="stretched-link">Modals</a><small class="text-muted mb-0">Useful Popups</small></div></div></div></div></li><li class="nav-item dropdown-style-switcher dropdown me-2 me-xl-0"><a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">`);
        if (unref(theme) === "light") {
          _push(`<i class="bx bx-sun bx-sm"></i>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(theme) === "dark") {
          _push(`<i class="bx bx-moon bx-sm"></i>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(theme) === "system") {
          _push(`<i class="bx bx-desktop bx-sm"></i>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</a><ul class="dropdown-menu dropdown-menu-end dropdown-styles"><li><a class="${ssrRenderClass([{ active: unref(theme) === "light" }, "dropdown-item"])}" href="javascript:void(0);"><span class="align-middle"><i class="bx bx-sun me-2"></i>${ssrInterpolate(_ctx.$t("actions.mode.light"))}</span></a></li><li><a class="${ssrRenderClass([{ active: unref(theme) === "dark" }, "dropdown-item"])}" href="javascript:void(0);"><span class="align-middle"><i class="bx bx-moon me-2"></i>${ssrInterpolate(_ctx.$t("actions.mode.dark"))}</span></a></li><li><a class="${ssrRenderClass([{ active: unref(theme) === "system" }, "dropdown-item"])}" href="javascript:void(0);"><span class="align-middle"><i class="bx bx-desktop me-2"></i>${ssrInterpolate(_ctx.$t("actions.mode.system"))}</span></a></li></ul></li><li class="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-1"><a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false"><i class="bx bx-bell bx-sm"></i><span class="badge bg-danger rounded-pill badge-notifications"> 5 </span></a><ul class="dropdown-menu dropdown-menu-end py-0"><li class="dropdown-menu-header border-bottom"><div class="dropdown-header d-flex align-items-center py-3"><h5 class="text-body mb-0 me-auto">Notification</h5><a href="javascript:void(0)" class="dropdown-notifications-all text-body" data-bs-toggle="tooltip" data-bs-placement="top" title="Mark all as read"><i class="bx fs-4 bx-envelope-open"></i></a></div></li><li class="dropdown-notifications-list scrollable-container"><ul class="list-group list-group-flush"><li class="list-group-item list-group-item-action dropdown-notifications-item"><div class="d-flex"><div class="flex-shrink-0 me-3"><div class="avatar"><img src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png" alt class="w-px-40 h-auto rounded-circle"></div></div><div class="flex-grow-1"><h6 class="mb-1"> Congratulation Lettie 🎉 </h6><p class="mb-0"> Won the monthly best seller gold badge </p><small class="text-muted">1h ago</small></div><div class="flex-shrink-0 dropdown-notifications-actions"><a href="javascript:void(0)" class="dropdown-notifications-read"><span class="badge badge-dot"></span></a><a href="javascript:void(0)" class="dropdown-notifications-archive"><span class="bx bx-x"></span></a></div></div></li><li class="list-group-item list-group-item-action dropdown-notifications-item"><div class="d-flex"><div class="flex-shrink-0 me-3"><div class="avatar"><span class="avatar-initial rounded-circle bg-label-danger"> CF </span></div></div><div class="flex-grow-1"><h6 class="mb-1">Charles Franklin</h6><p class="mb-0">Accepted your connection</p><small class="text-muted">12hr ago</small></div><div class="flex-shrink-0 dropdown-notifications-actions"><a href="javascript:void(0)" class="dropdown-notifications-read"><span class="badge badge-dot"></span></a><a href="javascript:void(0)" class="dropdown-notifications-archive"><span class="bx bx-x"></span></a></div></div></li><li class="list-group-item list-group-item-action dropdown-notifications-item marked-as-read"><div class="d-flex"><div class="flex-shrink-0 me-3"><div class="avatar"><img src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/2.png" alt class="w-px-40 h-auto rounded-circle"></div></div><div class="flex-grow-1"><h6 class="mb-1">New Message ✉️</h6><p class="mb-0"> You have new message from Natalie </p><small class="text-muted">1h ago</small></div><div class="flex-shrink-0 dropdown-notifications-actions"><a href="javascript:void(0)" class="dropdown-notifications-read"><span class="badge badge-dot"></span></a><a href="javascript:void(0)" class="dropdown-notifications-archive"><span class="bx bx-x"></span></a></div></div></li><li class="list-group-item list-group-item-action dropdown-notifications-item"><div class="d-flex"><div class="flex-shrink-0 me-3"><div class="avatar"><span class="avatar-initial rounded-circle bg-label-success"><i class="bx bx-cart"></i></span></div></div><div class="flex-grow-1"><h6 class="mb-1"> Whoo! You have new order 🛒 </h6><p class="mb-0"> ACME Inc. made new order $1,154 </p><small class="text-muted">1 day ago</small></div><div class="flex-shrink-0 dropdown-notifications-actions"><a href="javascript:void(0)" class="dropdown-notifications-read"><span class="badge badge-dot"></span></a><a href="javascript:void(0)" class="dropdown-notifications-archive"><span class="bx bx-x"></span></a></div></div></li><li class="list-group-item list-group-item-action dropdown-notifications-item marked-as-read"><div class="d-flex"><div class="flex-shrink-0 me-3"><div class="avatar"><img src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/9.png" alt class="w-px-40 h-auto rounded-circle"></div></div><div class="flex-grow-1"><h6 class="mb-1"> Application has been approved 🚀 </h6><p class="mb-0"> Your ABC project application has been approved. </p><small class="text-muted">2 days ago</small></div><div class="flex-shrink-0 dropdown-notifications-actions"><a href="javascript:void(0)" class="dropdown-notifications-read"><span class="badge badge-dot"></span></a><a href="javascript:void(0)" class="dropdown-notifications-archive"><span class="bx bx-x"></span></a></div></div></li><li class="list-group-item list-group-item-action dropdown-notifications-item marked-as-read"><div class="d-flex"><div class="flex-shrink-0 me-3"><div class="avatar"><span class="avatar-initial rounded-circle bg-label-success"><i class="bx bx-pie-chart-alt"></i></span></div></div><div class="flex-grow-1"><h6 class="mb-1"> Monthly report is generated </h6><p class="mb-0"> July monthly financial report is generated </p><small class="text-muted">3 days ago</small></div><div class="flex-shrink-0 dropdown-notifications-actions"><a href="javascript:void(0)" class="dropdown-notifications-read"><span class="badge badge-dot"></span></a><a href="javascript:void(0)" class="dropdown-notifications-archive"><span class="bx bx-x"></span></a></div></div></li><li class="list-group-item list-group-item-action dropdown-notifications-item marked-as-read"><div class="d-flex"><div class="flex-shrink-0 me-3"><div class="avatar"><img src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/5.png" alt class="w-px-40 h-auto rounded-circle"></div></div><div class="flex-grow-1"><h6 class="mb-1"> Send connection request </h6><p class="mb-0"> Peter sent you connection request </p><small class="text-muted">4 days ago</small></div><div class="flex-shrink-0 dropdown-notifications-actions"><a href="javascript:void(0)" class="dropdown-notifications-read"><span class="badge badge-dot"></span></a><a href="javascript:void(0)" class="dropdown-notifications-archive"><span class="bx bx-x"></span></a></div></div></li><li class="list-group-item list-group-item-action dropdown-notifications-item"><div class="d-flex"><div class="flex-shrink-0 me-3"><div class="avatar"><img src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/6.png" alt class="w-px-40 h-auto rounded-circle"></div></div><div class="flex-grow-1"><h6 class="mb-1">New message from Jane</h6><p class="mb-0"> Your have new message from Jane </p><small class="text-muted">5 days ago</small></div><div class="flex-shrink-0 dropdown-notifications-actions"><a href="javascript:void(0)" class="dropdown-notifications-read"><span class="badge badge-dot"></span></a><a href="javascript:void(0)" class="dropdown-notifications-archive"><span class="bx bx-x"></span></a></div></div></li><li class="list-group-item list-group-item-action dropdown-notifications-item marked-as-read"><div class="d-flex"><div class="flex-shrink-0 me-3"><div class="avatar"><span class="avatar-initial rounded-circle bg-label-warning"><i class="bx bx-error"></i></span></div></div><div class="flex-grow-1"><h6 class="mb-1">CPU is running high</h6><p class="mb-0"> CPU Utilization Percent is currently at 88.63%, </p><small class="text-muted">5 days ago</small></div><div class="flex-shrink-0 dropdown-notifications-actions"><a href="javascript:void(0)" class="dropdown-notifications-read"><span class="badge badge-dot"></span></a><a href="javascript:void(0)" class="dropdown-notifications-archive"><span class="bx bx-x"></span></a></div></div></li></ul></li><li class="dropdown-menu-footer border-top p-3"><button class="btn btn-primary text-uppercase w-100"> view all notifications </button></li></ul></li><li class="nav-item navbar-dropdown dropdown-user dropdown"><a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown"><div class="avatar avatar-online"><img src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png" alt class="w-px-40 h-auto rounded-circle"></div></a><ul class="dropdown-menu dropdown-menu-end"><li><a class="dropdown-item" href="pages-account-settings-account.html"><div class="d-flex"><div class="flex-shrink-0 me-3"><div class="avatar avatar-online"><img src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png" alt class="w-px-40 h-auto rounded-circle"></div></div><div class="flex-grow-1"><span class="fw-medium d-block">John Doe</span><small class="text-muted">Admin</small></div></div></a></li><li><div class="dropdown-divider"></div></li><li><a class="dropdown-item" href="pages-profile-user.html"><i class="bx bx-user me-2"></i><span class="align-middle">My Profile</span></a></li><li><a class="dropdown-item" href="pages-account-settings-account.html"><i class="bx bx-cog me-2"></i><span class="align-middle">Settings</span></a></li><li><a class="dropdown-item" href="pages-account-settings-billing.html"><span class="d-flex align-items-center align-middle"><i class="flex-shrink-0 bx bx-credit-card me-2"></i><span class="flex-grow-1 align-middle"> Billing </span><span class="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20"> 4 </span></span></a></li><li><div class="dropdown-divider"></div></li><li><a class="dropdown-item" href="pages-faq.html"><i class="bx bx-help-circle me-2"></i><span class="align-middle">FAQ</span></a></li><li><a class="dropdown-item" href="pages-pricing.html"><i class="bx bx-dollar me-2"></i><span class="align-middle">Pricing</span></a></li><li><div class="dropdown-divider"></div></li><li><a class="dropdown-item" href="#"><i class="bx bx-power-off me-2"></i><span class="align-middle">${ssrInterpolate(_ctx.$t("auth.logout"))}</span></a></li></ul></li></ul></div></nav><div class="content-wrapper"><div class="container-fluid flex-grow-1 container-p-y"><div class="h4 mb-4 py-3"><!--[-->`);
        ssrRenderList(unref(breadcrumbs2), (crumb, i) => {
          _push(`<!--[-->`);
          if (crumb.href) {
            _push(ssrRenderComponent(unref(Link), {
              href: crumb.href,
              class: "text-muted fw-light"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(crumb.label)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(crumb.label), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<span class="${ssrRenderClass([i === unref(breadcrumbs2).length - 1 ? "text-purple-500" : "", "text-muted fw-light"])}">${ssrInterpolate(crumb.label)}</span>`);
          }
          if (i < unref(breadcrumbs2).length - 1) {
            _push(`<span class="mx-1 text-muted fw-light">/</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></div>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div><footer class="content-footer footer bg-footer-theme"><div class="container-fluid d-flex justify-content-between flex-md-row flex-column flex-wrap py-2"><div class="mb-md-0 mb-2">Laravel v12.32.5 (PHP v8.3.22)</div></div></footer><div class="content-backdrop fade"></div></div></div></div><div class="layout-overlay layout-menu-toggle"></div><div class="drag-target"></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/layouts/dashboard/App.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "../pages/About.vue": __vite_glob_0_0$1, "../pages/Auth/ConfirmPassword.vue": __vite_glob_0_1, "../pages/Auth/ForgetPassword.vue": __vite_glob_0_2, "../pages/Auth/Login.vue": __vite_glob_0_3, "../pages/Auth/Register.vue": __vite_glob_0_4, "../pages/Auth/ResetPassword.vue": __vite_glob_0_5, "../pages/Auth/VerifyEmail.vue": __vite_glob_0_6, "../pages/Dashboard/BusinessRequests/Index.vue": __vite_glob_0_7, "../pages/Dashboard/Home.vue": __vite_glob_0_8, "../pages/Dashboard/PoiRequests/Index.vue": __vite_glob_0_9, "../pages/Dashboard/Pois/Index.vue": __vite_glob_0_10, "../pages/Dashboard/Users/Index.vue": __vite_glob_0_11, "../pages/Test.vue": __vite_glob_0_12 });
      const page2 = pages[`../pages/${name}.vue`];
      if (page2 && page2.default && page2.default.layout === void 0) {
        page2.default.layout = _sfc_main;
      }
      return page2;
    },
    setup({ App, props, plugin, el }) {
      return createSSRApp({
        render: () => h(App, props)
      }).use(plugin).use(i18nVue, {
        lang: Locale.getCode(),
        resolve: (lang) => {
          const langs = /* @__PURE__ */ Object.assign({ "../../../lang/php_ar.json": __vite_glob_1_0, "../../../lang/php_en.json": __vite_glob_1_1 });
          return langs[`../../../lang/${lang}.json`].default;
        }
      }).use(store).use(Auth).provide("$locale", Locale).provide("$axios", axiosInstance);
    }
  })
);
