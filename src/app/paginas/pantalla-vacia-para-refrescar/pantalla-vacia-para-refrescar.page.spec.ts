import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PantallaVaciaParaRefrescarPage } from './pantalla-vacia-para-refrescar.page';

describe('PantallaVaciaParaRefrescarPage', () => {
  let component: PantallaVaciaParaRefrescarPage;
  let fixture: ComponentFixture<PantallaVaciaParaRefrescarPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PantallaVaciaParaRefrescarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PantallaVaciaParaRefrescarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
