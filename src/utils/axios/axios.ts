import axios from 'axios';
import BackendURL from '@/utils/BackendURL';

export async function NoteRequests({ ...args }) {
  try {
    const response = await axios({
      method: args.method,
      data: args.data,
      params: args.params,
      withCredentials: true,
      headers: {
        ...args.header,
      },
      baseURL: BackendURL + args.url,
    });
    return { ok: true, data: response.data };
  } catch {
    return {
      ok: false,
      error: 'Something went wrong',
    };
  }
}
