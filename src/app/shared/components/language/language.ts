import { Component, inject, signal, WritableSignal } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import {
  TranslocoService,
  TranslocoDirective,
  AvailableLangs,
  LangDefinition,
} from '@jsverse/transloco';
import { ICON_NAMES, IconService, OnClickOutside } from 'src/app/core';
import { TRANSLATION_KEYS } from 'src/app/shared/localization/translation-keys';

/**
 * This component represents a menu to change the language of the application.
 */
@Component({
  selector: 'app-language',
  templateUrl: './language.html',
  styleUrl: './language.scss',
  imports: [MatIcon, TranslocoDirective, NgClass, OnClickOutside],
})
export class Language {
  private readonly icon = inject(IconService);
  private readonly transloco = inject(TranslocoService);

  protected readonly activeLang: WritableSignal<string>;
  protected readonly activeMenu = signal<boolean>(false);

  constructor() {
    this.icon.registerIcons([ICON_NAMES.german_flag, ICON_NAMES.britain_flag]);
    this.activeLang = signal(this.transloco.getActiveLang());
  }

  /**
   * This method returns all available languages.
   */
  protected get languages(): AvailableLangs {
    return this.transloco.getAvailableLangs();
  }

  /**
   * This method returns the name of the icon which corresponds
   * to a specific language.
   *
   * @param language The correpoding language.
   * @returns An icon name.
   */
  protected getIconName(language: string | LangDefinition): string {
    const key = typeof language === 'string' ? language : language.id;
    switch (key) {
      case 'de':
        return ICON_NAMES.german_flag;
      default:
        return ICON_NAMES.britain_flag;
    }
  }

  /**
   * This method returns the translation key which corresponds
   * to a specific language.
   *
   * @param language  The corresponding language.
   * @returns The translation key.
   */
  protected getTranslationKey(language: string | LangDefinition): string {
    const key = typeof language === 'string' ? language : language.id;
    switch (key) {
      case 'de':
        return TRANSLATION_KEYS.language.german;
      default:
        return TRANSLATION_KEYS.language.english;
    }
  }

  /**
   * This method changes the language of the application.
   *
   * @param language The language that has been selected.
   */
  protected onLanguage(language: string | LangDefinition): void {
    const key = typeof language === 'string' ? language : language.id;
    this.transloco.setActiveLang(key);
    this.activeLang.update(() => key);
  }

  /**
   * This method activates and deactivates the language selection menu.
   */
  protected onLanguageMenu(): void {
    this.activeMenu.update(value => !value);
  }

  /**
   * This method deativates the language selection menu if the user
   * has clicked outside the menu element.
   */
  protected onOutside(): void {
    this.activeMenu.update(() => false);
  }

  /**
   * This method returns the CSS class of an active language, but
   * only if the language is selected.
   *
   * @param language A language.
   * @returns The CSS class if the language is active, otherwise
   * an empty string.
   */
  protected isActive(language: string | LangDefinition): string {
    const key = typeof language === 'string' ? language : language.id;
    if (key == this.activeLang()) {
      return 'active';
    }
    return '';
  }
}
