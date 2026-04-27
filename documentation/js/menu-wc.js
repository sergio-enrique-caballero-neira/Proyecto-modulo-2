'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">mi-primer-angular documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-2c0fdccb9245291aa3d6fa72714cfa6c37fba5f463b08215672ea37393774a9c4198a4f1e8feba11fe716ea96e240a5deba2be2a3b99b8d57e3160d33bd90b20"' : 'data-bs-target="#xs-components-links-module-AppModule-2c0fdccb9245291aa3d6fa72714cfa6c37fba5f463b08215672ea37393774a9c4198a4f1e8feba11fe716ea96e240a5deba2be2a3b99b8d57e3160d33bd90b20"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-2c0fdccb9245291aa3d6fa72714cfa6c37fba5f463b08215672ea37393774a9c4198a4f1e8feba11fe716ea96e240a5deba2be2a3b99b8d57e3160d33bd90b20"' :
                                            'id="xs-components-links-module-AppModule-2c0fdccb9245291aa3d6fa72714cfa6c37fba5f463b08215672ea37393774a9c4198a4f1e8feba11fe716ea96e240a5deba2be2a3b99b8d57e3160d33bd90b20"' }>
                                            <li class="link">
                                                <a href="components/AdminDashboard.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminDashboard</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminLogin.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminLogin</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminMenuAdministrador.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminMenuAdministrador</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminMenuCarta.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminMenuCarta</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminMenuConductor.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminMenuConductor</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminMenuManipulador.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminMenuManipulador</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminMenuPaqueteAlimenticio.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminMenuPaqueteAlimenticio</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminMenuPaqueteNoAlimenticio.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminMenuPaqueteNoAlimenticio</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminMenuPrincipal.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminMenuPrincipal</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminMenuUsuarioConcurrente.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminMenuUsuarioConcurrente</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminMenuUsuarioNormal.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminMenuUsuarioNormal</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminMenuUsuarioPremium.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminMenuUsuarioPremium</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/App.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >App</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConductorMenuActualizar.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConductorMenuActualizar</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConductorMenuEvidencia.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConductorMenuEvidencia</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConductorMenuPrincipal.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConductorMenuPrincipal</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Login.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Login</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManipuladorMenuActualizar.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManipuladorMenuActualizar</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManipuladorMenuEvicencia.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManipuladorMenuEvicencia</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManipuladorMenuPrincipal.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManipuladorMenuPrincipal</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Register.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Register</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsuariosDashboard.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsuariosDashboard</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsuariosMenuCartas.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsuariosMenuCartas</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsuariosMenuPaquetesAlimenticios.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsuariosMenuPaquetesAlimenticios</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsuariosMenuPaquetesNoAlimenticios.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsuariosMenuPaquetesNoAlimenticios</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsuariosMenuPrincipal.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsuariosMenuPrincipal</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdministradorService.html" data-type="entity-link" >AdministradorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CartaService.html" data-type="entity-link" >CartaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConductorService.html" data-type="entity-link" >ConductorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ManipuladorService.html" data-type="entity-link" >ManipuladorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ModelosTempService.html" data-type="entity-link" >ModelosTempService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PaquetealimenticioService.html" data-type="entity-link" >PaquetealimenticioService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PaquetenoalimenticioService.html" data-type="entity-link" >PaquetenoalimenticioService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsuarioconcurrenteService.html" data-type="entity-link" >UsuarioconcurrenteService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsuarionormalService.html" data-type="entity-link" >UsuarionormalService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsuariopremiumService.html" data-type="entity-link" >UsuariopremiumService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AdministradorModel.html" data-type="entity-link" >AdministradorModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CartaModel.html" data-type="entity-link" >CartaModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConductorModel.html" data-type="entity-link" >ConductorModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ManipuladorModel.html" data-type="entity-link" >ManipuladorModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModeloTempModel.html" data-type="entity-link" >ModeloTempModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaqueteAlimenticioModel.html" data-type="entity-link" >PaqueteAlimenticioModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaqueteNoAlimenticioModel.html" data-type="entity-link" >PaqueteNoAlimenticioModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UsuarioConcurrenteModel.html" data-type="entity-link" >UsuarioConcurrenteModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UsuarioNormalModel.html" data-type="entity-link" >UsuarioNormalModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UsuarioPremiumModel.html" data-type="entity-link" >UsuarioPremiumModel</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});