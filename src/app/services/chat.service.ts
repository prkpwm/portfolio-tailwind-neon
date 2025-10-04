import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) {}

  getAIResponse(question: string, portfolioContext: string, questions: any[]): Observable<string> {
    const prompt = `Context: ${portfolioContext}\n\nQuestion: ${question}\n\nAnswer as Pakpoom's AI assistant:`;
    
    return this.http.post<any>(API_CONFIG.HUGGINGFACE.API_URL, {
      inputs: prompt,
      parameters: {
        max_length: 150,
        temperature: 0.7,
        return_full_text: false
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      map(response => response[0]?.generated_text || this.findAnswer(question, questions)),
      catchError(() => of(this.findAnswer(question, questions)))
    );
  }

  private findAnswer(question: string, questions: any[]): string {
    const lowerQuestion = question.toLowerCase();
    let bestMatch = null;
    let bestScore = 0;
    
    for (const q of questions) {
      const similarity = this.calculateSimilarity(lowerQuestion, q.question.toLowerCase());
      if (similarity > bestScore && similarity > 0.3) {
        bestScore = similarity;
        bestMatch = q;
      }
    }
    
    return bestMatch ? bestMatch.answer : 'I\'m not sure about that. Could you ask something else about Pakpoom\'s experience or skills?';
  }

  private calculateSimilarity(str1: string, str2: string): number {
    const distance = this.levenshteinDistance(str1, str2);
    const maxLength = Math.max(str1.length, str2.length);
    return maxLength === 0 ? 1 : 1 - distance / maxLength;
  }

  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + cost
        );
      }
    }
    
    return matrix[str2.length][str1.length];
  }
}