export const baseURL =
  'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';

export const fetchApi = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
};
