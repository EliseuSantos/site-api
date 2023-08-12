import { ECONNREFUSED } from 'constants';
import { Injectable, Logger } from '@nestjs/common';
import { NormalException } from '@/exception';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

@Injectable()
export class HttpService {
  private instance: AxiosInstance;

  private logger = new Logger(HttpService.name);

  constructor() {
    const instance = axios.create({
      timeout: 5000,
    });

    instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        this.logger.error(error.toJSON());
      }
    );

    instance.interceptors.response.use(
      (response) => {
        if (response?.data) this.logger.debug(response.data);

        return response;
      },
      (error) => {
        if (error.errno === ECONNREFUSED * -1)
          throw NormalException.HTTP_REQUEST_TIMEOUT();

        if (axios.isAxiosError(error)) {
          if (error?.response?.data) this.logger.debug(error.response.data);
          this.logger.error(error.toJSON());
          return;
        }

        this.logger.error(error);
      }
    );

    this.instance = instance;
  }

  getInstance() {
    return this.instance;
  }

  async get<T = any, C = any>(
    url: string,
    config?: AxiosRequestConfig<C>
  ): Promise<T> {
    return (await this.instance.get(url, config))?.data;
  }

  async head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return (await this.instance.head(url, config))?.data;
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return (await this.instance.delete(url, config))?.data;
  }

  async options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return (await this.instance.options(url, config))?.data;
  }

  async post<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return (await this.instance.post(url, data, config))?.data;
  }

  async put<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return (await this.instance.put(url, data, config))?.data;
  }

  async patch<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return (await this.instance.patch(url, data, config))?.data;
  }
}
