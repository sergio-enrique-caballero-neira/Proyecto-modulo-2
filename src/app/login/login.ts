import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {UsuarioModel} from '../models/usuario.model';
import {UsuarioService} from '../services/usuario.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private router: Router) {
  }

  public usuarioService = inject(UsuarioService);

  usuario: string = "";
  contrasena: string = "";
  usuarios: UsuarioModel[] = [];
  errorNombre: boolean = false;
  errorContrasena: boolean = false;

  ngOnInit() {
    this.usuarioService.getUsuariosConcurrentes().subscribe({
      next: (usu) => {
        if (usu.body) {
          this.usuarios.push(...usu.body);
        }
      },
      error: (err) => {
        console.log("No hay usuarios", err);
      }
    });

    this.usuarioService.getUsuariosNormales().subscribe({
      next: (usu) => {
        if (usu.body) {
          this.usuarios.push(...usu.body);
        }
      },
      error: (err) => {
        console.log("No hay usuarios", err);
      }
    });

    this.usuarioService.getUsuariosPremium().subscribe({
      next: (usu) => {
        if (usu.body) {
          this.usuarios.push(...usu.body);
        }
      },
      error: (err) => {
        console.log("No hay usuario", err);
      }
    });
  }

  login(): void {
    for (let usuario of this.usuarios) {
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
