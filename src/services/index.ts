/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

enum StatusCode {
	Unauthorized = 401,
	Forbidden = 403,
	TooManyRequests = 429,
	InternalServerError = 500,
}

const headers: Readonly<Record<string, string | boolean>> = {
	Accept: 'application/json',
};

// We can use the following function to inject the JWT token through an interceptor
// We get the `accessToken` from the localStorage that we set when we authenticate
const injectToken = (config: any): InternalAxiosRequestConfig => {
	try {
		const token = localStorage.getItem('token');
		if (token != null) {
			config.headers.authorization = `Bearer ${token}`;
		}
		return config;
	} catch (error) {
		throw new Error(String(error));
	}
};

class Http {
	private instance: AxiosInstance | null = null;

	private get http(): AxiosInstance {
		return this.instance != null ? this.instance : this.initHttp();
	}

	initHttp() {
		const http = axios.create({
			baseURL: _APP_API_URL_,
			headers,
			//withCredentials: true,
		});

		http.interceptors.request.use(injectToken, (error) =>
			Promise.reject(error)
		);

		http.interceptors.response.use(
			(response): any => {
				return { data: response.data, status: response.status };
			},
			(error) => {
				const { response } = error;
				return this.handleError(response);
			}
		);

		this.instance = http;
		return http;
	}

	request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
		return this.http.request(config);
	}

	get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
		return this.http.get<T, R>(url, config);
	}

	post<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
		return this.http.post<T, R>(url, data, config);
	}

	put<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
		return this.http.put<T, R>(url, data, config);
	}

	delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
		return this.http.delete<T, R>(url, config);
	}

	// Handle global app errors
	// We can handle generic app errors depending on the status code
	private handleError(error: any) {
		const { status } = error;
		switch (status) {
			case StatusCode.InternalServerError: {
				// Handle InternalServerError
				break;
			}
			case StatusCode.Forbidden: {
				// Handle Forbidden
				break;
			}
			case StatusCode.Unauthorized: {
				// Handle Unauthorized
				// localStorage.clear();
				// window.location.href = '/';
				break;
			}
			case StatusCode.TooManyRequests: {
				// Handle TooManyRequests
				break;
			}
		}
		return Promise.reject(error);
	}
}

export const http = new Http();
