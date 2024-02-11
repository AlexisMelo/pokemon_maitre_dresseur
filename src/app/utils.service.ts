import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  /**
   * Sauvegarde une chaîne de caractère dans un fichier
   * @param text
   * @param filename
   */
  public saveToFile(text: string, filename: string) {
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    const blob = new Blob([text], { type: 'text/csv' });
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
    a.click();
  }
}
