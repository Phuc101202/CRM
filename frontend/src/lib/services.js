import api from "./api";

/* ── Auth ───────────────────────────────────────────────────────────── */
export const authApi = {
  login: (data) => api.post("/auth/login", data),

  register: (data) => api.post("/auth/register", data),

  me: () => api.get("/auth/me"),

  updateProfile: (data) => api.put("/auth/profile", data),
  
};

/* ── Leads ──────────────────────────────────────────────────────────── */
export const leadsApi = {
  list: (params) => api.get("/leads", { params }),

  get: (id) => api.get(`/leads/${id}`),

  create: (data) => api.post("/leads", data),

  update: (id, data) => api.put(`/leads/${id}`, data),

  remove: (id) => api.delete(`/leads/${id}`),

  reorder: (updates) => api.patch("/leads/reorder", { updates }),
  
};

/* ── Contacts ───────────────────────────────────────────────────────── */
export const contactsApi = {
  list: (params) => api.get("/contacts", { params }),

  get: (id) => api.get(`/contacts/${id}`),

  create: (data) => api.post("/contacts", data),

  update: (id, data) => api.put(`/contacts/${id}`, data),
  
  remove: (id) => api.delete(`/contacts/${id}`),
  
};

/* ── Notes ──────────────────────────────────────────────────────────── */
export const notesApi = {
  list: (params) => api.get("/notes", { params }),

  create: (data) => api.post("/notes", data),

  update: (id, data) => api.put(`/notes/${id}`, data),

  remove: (id) => api.delete(`/notes/${id}`),
};

/* ── Tasks ──────────────────────────────────────────────────────────── */
export const tasksApi = {
  list: (params) => api.get("/tasks", { params }),

  create: (data) => api.post("/tasks", data),

  update: (id, data) => api.put(`/tasks/${id}`, data),

  remove: (id) => api.delete(`/tasks/${id}`),
};

/* ── AI  ─────────────────────────────────────── */
export const aiApi = {
  status: () => api.get("/ai/status"),

  leadSummary: (data) => api.post("/ai/lead-summary", data),

  generateEmail: (data) => api.post("/ai/generate-email", data),

  salesInsights: (data) => api.post("/ai/sales-insights", data),
};

/* ── Analytics ──────────────────────────────────── */
export const analyticsApi = {
  overview: () => api.get("/analytics/overview"),
};

