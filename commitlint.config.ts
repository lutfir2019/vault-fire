// commitlint.config.mjs
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Jenis commit yang diizinkan
    "type-enum": [
      2,
      "always",
      [
        "feat", // fitur baru
        "fix", // perbaikan bug
        "docs", // perubahan dokumentasi
        "style", // perubahan format (whitespace, prettier)
        "refactor", // refactor tanpa ubah behavior
        "perf", // peningkatan performa
        "test", // menambah atau memperbaiki test
        "build", // perubahan build system, deps, dll
        "ci", // perubahan CI/CD
        "chore", // tugas rutin (misal update deps)
        "revert", // membatalkan commit sebelumnya
      ],
    ],

    // Format subject (judul)
    "subject-case": [
      2,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"],
    ],
    "subject-empty": [2, "never"], // subject wajib diisi
    "subject-full-stop": [2, "never", "."], // tidak boleh diakhiri titik

    // Format type
    "type-empty": [2, "never"], // type wajib diisi

    // Format scope (opsional tapi rapi)
    "scope-empty": [1, "never"], // disarankan isi scope
    "scope-case": [2, "always", "kebab-case"],

    // Panjang maksimal title
    "header-max-length": [2, "always", 100],
  },
};
