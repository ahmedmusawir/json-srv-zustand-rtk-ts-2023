import apiClient from "./apiClient";

interface Entity {
  id: number | string;
}

class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>() {
    const controller = new AbortController();

    const request = apiClient.get<T[]>(this.endpoint + "/", {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  get<T>(id: number | string) {
    const controller = new AbortController();

    const request = apiClient.get<T>(this.endpoint + "/" + id, {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  delete(id: number | string) {
    return apiClient.delete(this.endpoint + "/" + id);
  }

  post<T>(entity: T) {
    return apiClient.post(this.endpoint, entity);
  }

  update<T extends Entity>(entity: T) {
    return apiClient.put(this.endpoint + "/" + entity.id, entity);
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
