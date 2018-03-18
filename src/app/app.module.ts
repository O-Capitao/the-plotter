import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { PlotComponent } from './plot/plot.component';
import { HomeComponent } from './home/home.component';
import { ToolsComponent } from './tools/tools.component';
import { LineComponent } from './plot/line/line.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PlotComponent,
    HomeComponent,
    ToolsComponent,
    LineComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
