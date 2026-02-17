import { inject, Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { TRANSLATION_KEYS } from 'src/app/shared';

@Injectable({
  providedIn: 'root',
})
export class DiagramService {
  private readonly transloco = inject(TranslocoService);
  private readonly maxStringLength = 3;

  /**
   * This method returns a randomly selected color.
   */
  getColor(): string {
    const randomValue = () => {
      return Math.floor(Math.random() * 256);
    };
    return `rgb(${randomValue()}, ${randomValue()}, ${randomValue()})`;
  }

  /**
   * This method returns a function that adjusts the axis labels.
   * Numbers larger than one thousand are being cut. Strings larger
   * than three characters are being cut.
   */
  adjustLabel(): (value: number | string) => string {
    return value => {
      if (typeof value === 'number') {
        let label = value.toString();
        let shortcut = '';
        if (value >= 1e6) {
          label = (value / 1e6).toFixed(2);
          shortcut = this.transloco.translate(TRANSLATION_KEYS.diagram.million);
        } else if (value >= 1e3) {
          label = (value / 1e3).toFixed(2);
          shortcut = this.transloco.translate(
            TRANSLATION_KEYS.diagram.thousand
          );
        }
        return `${label}${shortcut}`;
      }
      if (value.length > this.maxStringLength) {
        return value.substring(0, this.maxStringLength);
      }
      return value;
    };
  }
}
