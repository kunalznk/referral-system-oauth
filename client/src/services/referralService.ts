import customAxios from '../utils/axios';


const referralService = {
  createReferralCode: async () => {
    try {
      const response = await customAxios.post(`/referral`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  validateReferralCode: async (referralCode) => {
    try {
      const response = await customAxios.get(`/referral`, {
        params: { referralCode },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getReferralsByUserId: async () => {
    try {
      const response = await customAxios.get(`/referral/user`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
,
  getScore: async () => {
    try {
      const response = await customAxios.get(`/referral/users`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default referralService;