import api from "../index";

const DashboardAPI = {
  getSummary: (limit = 3) =>
    api.get(`/dashboard-summary`, {
      params: { limit },
    }),
};

export default DashboardAPI;
