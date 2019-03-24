import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebsocketService } from './websocket.service';
import {map} from 'rxjs/operators';

const CHAT_URL = 'ws://localhost:12312/ws';

export interface Message {
  author: string;
  message: string;
}

@Injectable()
export class ChatService {
  public messages: Subject<Message>;

  constructor(wsService: WebsocketService) {
    let subject = wsService.connect(CHAT_URL);

    this.messages = <Subject<Message>> subject.pipe(
      map((response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          author: data.author,
          message: data.message
        };
        }
      )
    );
  }
}
