/*
 * Author: Marco Pasqualini
 * File: source/callManager/restManager.ts
 * Creation date: 2017-06-02
 * Last modified: 2017-08-22
 */
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

type ResponseHandler = (response: AxiosResponse) => void;

interface RequestConfig extends AxiosRequestConfig {
  retryCount: number;
  responseHandler: ResponseHandler;
}

/** Uses axios to manage API calls  */
class RestManager {
  /** caps retry number for a single call  */
  private static retryLimit = 5;
  /** caps outbound number of simultaneous calls */
  private static outCallsLimit = 10;

  /** mantains current calls requested by the client */
  private callStack: RequestConfig[];
  /** mantains current number of outbound calls */
  private outCalls: number;

  /** API basePath */
  private baseURL: string;
  /** API authPath */
  private authPath: string;
  /** api_key username */
  private username: string;
  /** api_key password */
  private password: string;
  /** Axios instance */
  private connection: AxiosInstance;

  public constructor(baseURL: string, authPath?: string, username?: string, password?: string) {
    this.baseURL = baseURL;
    this.authPath = authPath;
    this.username = username;
    this.password = password;
    this.outCalls = 0;
    this.callStack = [];

    this.getConnection();
  }

  /** manages single call */
  public call(method: string, path: string, handler: ResponseHandler, payload: object = null) {
    const requestConfig: RequestConfig = {
      method,
      url: this.baseURL + path,
      data: payload,
      responseHandler: handler,
      retryCount: 0,
    };

    this.callStack.push(requestConfig);
    this.caller();
  }

  /** read cookies utility  */
  private getCookie(name: string) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  /** make and tracks outbound call */
  private caller() {
    while (this.callStack.length > 0 && this.outCalls < RestManager.outCallsLimit) {
      const requestConfig: RequestConfig = this.callStack.shift();
      this.outCalls += 1;
      this.connection.request(requestConfig)
        .then(response => this.success(response, requestConfig.responseHandler))
        .catch(error => this.error(error, requestConfig));
    }
  }

  /** manages successfull calls */
  private success(response: AxiosResponse, handler: ResponseHandler) {
    this.outCalls -= 1;
    this.caller();
    handler(response);
  }

  /** manages unsuccessfull calls */
  private error(error: AxiosError, request: RequestConfig) {
    if (!error.response || error.response.status === 401) {
      this.outCalls -= 1;
      this.caller();
      request.retryCount += 1;
      if (request.retryCount >= RestManager.retryLimit) {
        // internet error
      } else {
        this.callStack.push(request);
      }
    }
  }

  /** check current api_key validity and gets new key if invalid */
  private checkApiKeyValidity(response: AxiosResponse) {
    let transformerResponse: AxiosResponse = response;
    if (response.status === 401) {
      this.getConnection();
      this.connection.request(response.config)
        .then(newResponse => transformerResponse = newResponse);
    }
    return transformerResponse;
  }

  /** establishes Axios connection instance */
  private getConnection() {
    if (this.authPath) {
      axios(
        {
          method: 'POST',
          url: this.authPath,
          data: {
            username: this.username,
            password: this.password,
          },
        },
      )
        .then(response => this.connection = axios.create(
          {
            baseURL: this.baseURL,
            timeout: 2000,
            headers: {
              Authorization: 'JWT ' + response.data.token,
            },
            transformResponse: [this.checkApiKeyValidity],
          },
        ))
        .catch(error => console.error('cannot auth:', error, error.request, error.response));
    } else {
      this.connection = axios.create(
        {
          baseURL: this.baseURL,
          headers: {
            'X-CSRFToken': this.getCookie('csrftoken'),
          },
          timeout: 2000,
        },
      );
    }
  }
}

export { RestManager, ResponseHandler };
