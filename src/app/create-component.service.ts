import {Injectable, ViewContainerRef, Compiler, Component, NgModule} from '@angular/core';
import {IDomNode} from './DomNode.interface';

@Injectable()
export class CreateComponentService {

  constructor(private compiler: Compiler) { }

  /**
   * Динамически создает компонент с переданным шаблоном, создает модуль,
   * компилирует модуль и компонент, а затем вставляет компонент в указанный контейнер.
   * @param {string} template - Шаблон компонента.
   * @param {ViewContainerRef} viewContainerRef - Контейнер, куда будет вставлен компонент.
   * @return {ComponentRef} Созданный компонент.
   */
  addComponent(template: string, viewContainerRef: ViewContainerRef) {
    @Component({template: template})
    class TemplateComponent {}

    @NgModule({declarations: [TemplateComponent]})
    class TemplateModule {}

    const mod = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
    const factory = mod.componentFactories.find((comp) =>
        comp.componentType === TemplateComponent
    );
    return viewContainerRef.createComponent(factory);
  }

  /**
   * Генерирует шаблон из json-объекта.
   * @param {IDomNode} obj - DOM-модель.
   * @return {string} Шаблон в виде строки.
  */
  generateTemplateFromJson(obj: IDomNode) {

    //Создание корневого элемента
    const el = document.createElement(obj.tag);

    //Добавление атрибутов к корневому элементу
    for (let attr in obj.attributes) {
      el.setAttribute(attr, obj.attributes[attr]);
    }

    //Обработка контента
    processContent(el, obj.content);

    //Добавление корневого элемента в DOM
    document.body.appendChild(el);

    // Запись полученного шаблона в переменную,
    // удаление элементов из DOM и возврат строки с шаблоном
    const template = el.outerHTML;
    el.remove();
    return template;

    // Рекурсивная обработка контента элементов
    function processContent(parent, content) {
      for (let child of content) {
        if(child.tag) {
          const el = document.createElement(child.tag);
          for (let attr in child.attributes) {
            el.setAttribute(attr, child.attributes[attr]);
          }
          if (child.content) {
            processContent(el, child.content);
          }
          parent.appendChild(el);
        }
        if (child.text) {
          const text = document.createTextNode(child.text);
          parent.appendChild(text);
        }
      }
    }
  }

}
