import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {UsuarioConcurrenteModel} from '../models/usuarioConcurrente.model';
import {UsuarioNormalModel} from '../models/usuarioNormal.model';
import {UsuarioPremiumModel} from '../models/usuarioPremium.model';
import {UsuarioconcurrenteService} from '../services/usuarioconcurrente.service';
import {UsuarionormalService} from '../services/usuarionormal.service';
import {UsuariopremiumService} from '../services/usuariopremium.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private router: Router) {}

  public usuarioConcurrenteService = inject(UsuarioconcurrenteService);
  public usuarioNormalService = inject(UsuarionormalService);
  public usuarioPremiumService = inject(UsuariopremiumService);

  usuario: string = "";
  contrasena: string = "";
  usuariosConcurrentes: UsuarioConcurrenteModel[] = [];
  usuariosNormales: UsuarioNormalModel[] = [];
  usuariosPremium: UsuarioPremiumModel[] = [];
  errorNombre: boolean = false;
  errorContrasena: boolean = false;

  ngOnInit() {
    this.usuarioConcurrenteService.getUsuarios().subscribe({
      next: (usu) => {
        if (usu.body) {
          this.usuariosConcurrentes = usu.body;
        }
      },
      error: (err) => {
        console.log("No hay usuarios", err);
      }
    });

    this.usuarioNormalService.getUsuarios().subscribe({
      next: (usu) => {
        if (usu.body) {
          this.usuariosNormales = usu.body;
        }
      },
      error: (err) => {
        console.log("No hay usuarios", err);
      }
    });

    this.usuarioPremiumService.getUsuarios().subscribe({
      next: (usu) => {
        if (usu.body) {
          this.usuariosPremium = usu.body;
        }
      },
      error: (err) => {
        console.log("No hay usuario", err);
      }
    });
  }

  login(): void {

    if (this.usuario === "admin" && this.contrasena === "admin") {
      this.router.navigate(['/admin-login']);
      return;
    }

    for (let usuario of this.usuariosConcurrentes) {
      if (usuario.nombre === this.usuario && usuario.contrasena === this.contrasena) {
        this.router.navigate(['/usuarios-dashboard']);
        return;
      }
      else if (usuario.nombre === this.usuario && usuario.contrasena !== this.contrasena) {
        this.errorContrasena = true;
        return;
      }
      else if (usuario.nombre !== this.usuario && usuario.contrasena === this.contrasena) {
        this.errorNombre = true;
        return;
      }
      else {
        this.errorNombre = true;
        this.errorContrasena = true;
      }
    }

    for (let usuario of this.usuariosNormales) {
      if (usuario.nombre === this.usuario && usuario.contrasena === this.contrasena) {
        this.router.navigate(['/usuarios-dashboard']);
        return;
      }
      else if (usuario.nombre === this.usuario && usuario.contrasena !== this.contrasena) {
        this.errorContrasena = true;
        return;
      }
      else if (usuario.nombre !== this.usuario && usuario.contrasena === this.contrasena) {
        this.errorNombre = true;
        return;
      }
      else {
        this.errorNombre = true;
        this.errorContrasena = true;
      }
    }

    for (let usuario of this.usuariosPremium) {
      if (usuario.nombre === this.usuario && usuario.contrasena === this.contrasena) {
        this.router.navigate(['/usuarios-dashboard']);
        return;
      }
      else if (usuario.nombre === this.usuario && usuario.contrasena !== this.contrasena) {
        this.errorContrasena = true;
        return;
      }
      else if (usuario.nombre !== this.usuario && usuario.contrasena === this.contrasena) {
        this.errorNombre = true;
        return;
      }
      else {
        this.errorNombre = true;
        this.errorContrasena = true;
      }
    }
  }

}
