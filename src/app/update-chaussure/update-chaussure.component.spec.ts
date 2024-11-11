import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateChaussureComponent } from './update-chaussure.component';

describe('UpdateChaussureComponent', () => {
  let component: UpdateChaussureComponent;
  let fixture: ComponentFixture<UpdateChaussureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateChaussureComponent]
    });
    fixture = TestBed.createComponent(UpdateChaussureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
