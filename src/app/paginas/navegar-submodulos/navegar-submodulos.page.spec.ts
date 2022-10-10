import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NavegarSubmodulosPage } from './navegar-submodulos.page';

describe('NavegarSubmodulosPage', () => {
  let component: NavegarSubmodulosPage;
  let fixture: ComponentFixture<NavegarSubmodulosPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NavegarSubmodulosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NavegarSubmodulosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
