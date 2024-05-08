import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css'],
})
export class ConfiguracionComponent implements OnInit {
  frmEditPerfil: FormGroup;

  changetype: boolean = true;
  visible = true;

  logoFile: File;
  imageFile: File | undefined;
  logoPreview: string | undefined;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  // FUNCION PARA INICIALIZAR VALORES DEL FORMULARIO
  createForm() {
    this.frmEditPerfil = this.formBuilder.group({
      idPersona: [0],
      nombre: [''],
      email: [''],
      password: [''],
    });
  }

  mostrarPassword() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  onLogoChange(event: any): void {
    this.logoFile = event.target.files[0];
    this.logoPreview = URL.createObjectURL(this.logoFile);
  }

  // GETS PARA OBTENER EL VALOR DE LOS CAMPOS DEL FORMULARIO
  get controlNombre(): FormControl {
    return this.frmEditPerfil.controls['nombre'] as FormControl;
  }
  get controlEmail(): FormControl {
    return this.frmEditPerfil.controls['email'] as FormControl;
  }
  get controlPassword(): FormControl {
    return this.frmEditPerfil.controls['password'] as FormControl;
  }
}
