import {Component, OnInit, Input, ViewChild, ComponentRef} from '@angular/core';
import {Http} from '@angular/http';

import {HostDirective} from '../host.directive';
import {CreateComponentService} from '../create-component.service';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html'
})
export class BuilderComponent implements OnInit {
  @Input() urlPath; // Путь к json файлу
  @ViewChild(HostDirective) appHost: HostDirective;
  component: ComponentRef<any>;

  constructor(
      private http: Http,
      private createComponentService: CreateComponentService
  ) { }

  ngOnInit() {
    this.http.get(this.urlPath)
        .subscribe(
            res => {
              // Генерация шаблона из полученного json-объекта
              let template = this.createComponentService.generateTemplateFromJson(res.json());

              // Создание и вставка компонента по полученному шаблону
              this.component = this.createComponentService.addComponent(template, this.appHost.viewContainerRef);
            },
            err => console.log(err)
        );
  }
}