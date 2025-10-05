import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  @Input() chatMessages: Array<{type: 'user' | 'bot', message: string}> = [];
  @Input() userInput: string = '';
  @Input() isLoading: boolean = false;
  @Output() userInputChange = new EventEmitter<string>();
  @Output() sendMessage = new EventEmitter<void>();

  onUserInputChange(value: string) {
    this.userInputChange.emit(value);
  }

  onSendMessage() {
    this.sendMessage.emit();
  }
}