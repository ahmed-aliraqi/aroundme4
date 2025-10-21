<template>
    <!-- Layout wrapper -->
    <div class="layout-wrapper layout-content-navbar" v-if="pageLoaded">
        <div class="layout-container">
            <!-- Menu -->

            <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
                <div class="app-brand demo">
                    <a href="/" class="app-brand-link">
                        <span class="app-brand-logo demo">
                            <img
                                src="http://aroundme4.test/storage/1/logo.png"
                                class="mw-100"
                                style="height: 35px"
                                alt=""
                            />
                        </span>
                    </a>

                    <a
                        href="javascript:void(0);"
                        class="layout-menu-toggle menu-link text-large ms-auto"
                    >
                        <i class="bx bx-chevron-left bx-sm align-middle"></i>
                    </a>
                </div>

                <div class="menu-inner-shadow"></div>

                <SidebarItems></SidebarItems>
            </aside>
            <!-- / Menu -->

            <!-- Layout container -->
            <div class="layout-page">
                <!-- Navbar -->

                <nav
                    class="layout-navbar container-fluid navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
                    id="layout-navbar"
                >
                    <div
                        class="layout-menu-toggle navbar-nav align-items-xl-center me-xl-0 d-xl-none me-3"
                    >
                        <a class="nav-item nav-link me-xl-4 px-0" href="javascript:void(0)">
                            <i class="bx bx-menu bx-sm"></i>
                        </a>
                    </div>

                    <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">

                        <ul class="navbar-nav align-items-center ms-auto flex-row">
                            <!-- Language -->
                            <li class="nav-item dropdown-language dropdown me-2 me-xl-0">
                                <a
                                    class="nav-link dropdown-toggle hide-arrow"
                                    href="javascript:void(0);"
                                    data-bs-toggle="dropdown"
                                >
                                    <i class="bx bx-globe bx-sm"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li v-for="locale in locales.get()">
                                        <a
                                            class="dropdown-item"
                                            :class="{active: locales.current().getCode() === locale.getCode()}"
                                            :href="route('locale.change', locale.getCode())"
                                            @click.prevent="setLocale(locale)"
                                        >
                                            <span class="me-1 align-middle" v-html="locale.getSvgFlag(20,20)"></span>
                                            <span class="align-middle">{{ locale.getName() }}</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <!-- /Language -->

                            <!-- Quick links  -->
                            <li class="nav-item dropdown-shortcuts navbar-dropdown dropdown me-2 me-xl-0">
                                <a
                                    class="nav-link dropdown-toggle hide-arrow"
                                    href="javascript:void(0);"
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="outside"
                                    aria-expanded="false">
                                    <i class="bx bx-grid-alt bx-sm"></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end py-0">
                                    <div class="dropdown-menu-header border-bottom">
                                        <div class="dropdown-header d-flex align-items-center py-3">
                                            <h5 class="text-body mb-0 me-auto">Shortcuts</h5>
                                            <a
                                                href="javascript:void(0)"
                                                class="dropdown-shortcuts-add text-body"
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="top"
                                                title="Add shortcuts"
                                            ><i class="bx bx-sm bx-plus-circle"></i
                                            ></a>
                                        </div>
                                    </div>
                                    <div class="dropdown-shortcuts-list scrollable-container">
                                        <div class="row row-bordered overflow-visible g-0">
                                            <div class="dropdown-shortcuts-item col">
                          <span class="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                            <i class="bx bx-calendar fs-4"></i>
                          </span>
                                                <a href="app-calendar.html" class="stretched-link">Calendar</a>
                                                <small class="text-muted mb-0">Appointments</small>
                                            </div>
                                            <div class="dropdown-shortcuts-item col">
                          <span class="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                            <i class="bx bx-food-menu fs-4"></i>
                          </span>
                                                <a href="app-invoice-list.html" class="stretched-link">Invoice App</a>
                                                <small class="text-muted mb-0">Manage Accounts</small>
                                            </div>
                                        </div>
                                        <div class="row row-bordered overflow-visible g-0">
                                            <div class="dropdown-shortcuts-item col">
                          <span class="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                            <i class="bx bx-user fs-4"></i>
                          </span>
                                                <a href="app-user-list.html" class="stretched-link">User App</a>
                                                <small class="text-muted mb-0">Manage Users</small>
                                            </div>
                                            <div class="dropdown-shortcuts-item col">
                          <span class="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                            <i class="bx bx-check-shield fs-4"></i>
                          </span>
                                                <a href="app-access-roles.html" class="stretched-link">Role Management</a>
                                                <small class="text-muted mb-0">Permission</small>
                                            </div>
                                        </div>
                                        <div class="row row-bordered overflow-visible g-0">
                                            <div class="dropdown-shortcuts-item col">
                          <span class="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                            <i class="bx bx-pie-chart-alt-2 fs-4"></i>
                          </span>
                                                <a href="index.html" class="stretched-link">Dashboard</a>
                                                <small class="text-muted mb-0">User Profile</small>
                                            </div>
                                            <div class="dropdown-shortcuts-item col">
                          <span class="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                            <i class="bx bx-cog fs-4"></i>
                          </span>
                                                <a href="pages-account-settings-account.html" class="stretched-link">Setting</a>
                                                <small class="text-muted mb-0">Account Settings</small>
                                            </div>
                                        </div>
                                        <div class="row row-bordered overflow-visible g-0">
                                            <div class="dropdown-shortcuts-item col">
                          <span class="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                            <i class="bx bx-help-circle fs-4"></i>
                          </span>
                                                <a href="pages-faq.html" class="stretched-link">FAQs</a>
                                                <small class="text-muted mb-0">FAQs & Articles</small>
                                            </div>
                                            <div class="dropdown-shortcuts-item col">
                          <span class="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                            <i class="bx bx-window-open fs-4"></i>
                          </span>
                                                <a href="modal-examples.html" class="stretched-link">Modals</a>
                                                <small class="text-muted mb-0">Useful Popups</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <!-- Quick links -->

                            <!-- Style Switcher -->
                            <li class="nav-item dropdown-style-switcher dropdown me-2 me-xl-0">
                                <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                                    <i v-if="theme === 'light'" class="bx bx-sun bx-sm"></i>
                                    <i v-if="theme === 'dark'" class="bx bx-moon bx-sm"></i>
                                    <i v-if="theme === 'system'" class="bx bx-desktop bx-sm"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end dropdown-styles">
                                    <li>
                                        <a class="dropdown-item" :class="{active: theme === 'light'}" href="javascript:void(0);" @click.prevent="applyTheme('light')">
                                            <span class="align-middle"><i class="bx bx-sun me-2"></i>{{ $t('actions.mode.light') }}</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" :class="{active: theme === 'dark'}" href="javascript:void(0);" @click.prevent="applyTheme('dark')">
                                            <span class="align-middle"><i class="bx bx-moon me-2"></i>{{ $t('actions.mode.dark') }}</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" :class="{active: theme === 'system'}" href="javascript:void(0);" @click.prevent="applyTheme('system')">
                                            <span class="align-middle"><i class="bx bx-desktop me-2"></i>{{ $t('actions.mode.system') }}</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <!-- / Style Switcher-->

                            <!-- Notification -->
                            <li
                                class="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-1"
                            >
                                <a
                                    class="nav-link dropdown-toggle hide-arrow"
                                    href="javascript:void(0);"
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="outside"
                                    aria-expanded="false"
                                >
                                    <i class="bx bx-bell bx-sm"></i>
                                    <span class="badge bg-danger rounded-pill badge-notifications">
                                        5
                                    </span>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end py-0">
                                    <li class="dropdown-menu-header border-bottom">
                                        <div class="dropdown-header d-flex align-items-center py-3">
                                            <h5 class="text-body mb-0 me-auto">Notification</h5>
                                            <a
                                                href="javascript:void(0)"
                                                class="dropdown-notifications-all text-body"
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="top"
                                                title="Mark all as read"
                                            >
                                                <i class="bx fs-4 bx-envelope-open"></i>
                                            </a>
                                        </div>
                                    </li>
                                    <li class="dropdown-notifications-list scrollable-container">
                                        <ul class="list-group list-group-flush">
                                            <li
                                                class="list-group-item list-group-item-action dropdown-notifications-item"
                                            >
                                                <div class="d-flex">
                                                    <div class="flex-shrink-0 me-3">
                                                        <div class="avatar">
                                                            <img
                                                                src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png"
                                                                alt
                                                                class="w-px-40 h-auto rounded-circle"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="flex-grow-1">
                                                        <h6 class="mb-1">
                                                            Congratulation Lettie 🎉
                                                        </h6>
                                                        <p class="mb-0">
                                                            Won the monthly best seller gold badge
                                                        </p>
                                                        <small class="text-muted">1h ago</small>
                                                    </div>
                                                    <div
                                                        class="flex-shrink-0 dropdown-notifications-actions"
                                                    >
                                                        <a
                                                            href="javascript:void(0)"
                                                            class="dropdown-notifications-read"
                                                        >
                                                            <span class="badge badge-dot"></span>
                                                        </a>
                                                        <a
                                                            href="javascript:void(0)"
                                                            class="dropdown-notifications-archive"
                                                        >
                                                            <span class="bx bx-x"></span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                            <li
                                                class="list-group-item list-group-item-action dropdown-notifications-item"
                                            >
                                                <div class="d-flex">
                                                    <div class="flex-shrink-0 me-3">
                                                        <div class="avatar">
                                                            <span
                                                                class="avatar-initial rounded-circle bg-label-danger"
                                                            >
                                                                CF
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div class="flex-grow-1">
                                                        <h6 class="mb-1">Charles Franklin</h6>
                                                        <p class="mb-0">Accepted your connection</p>
                                                        <small class="text-muted">12hr ago</small>
                                                    </div>
                                                    <div
                                                        class="flex-shrink-0 dropdown-notifications-actions"
                                                    >
                                                        <a
                                                            href="javascript:void(0)"
                                                            class="dropdown-notifications-read"
                                                        >
                                                            <span class="badge badge-dot"></span>
                                                        </a>
                                                        <a
                                                            href="javascript:void(0)"
                                                            class="dropdown-notifications-archive"
                                                        >
                                                            <span class="bx bx-x"></span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                            <li
                                                class="list-group-item list-group-item-action dropdown-notifications-item marked-as-read"
                                            >
                                                <div class="d-flex">
                                                    <div class="flex-shrink-0 me-3">
                                                        <div class="avatar">
                                                            <img
                                                                src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/2.png"
                                                                alt
                                                                class="w-px-40 h-auto rounded-circle"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="flex-grow-1">
                                                        <h6 class="mb-1">New Message ✉️</h6>
                                                        <p class="mb-0">
                                                            You have new message from Natalie
                                                        </p>
                                                        <small class="text-muted">1h ago</small>
                                                    </div>
                                                    <div
                                                        class="flex-shrink-0 dropdown-notifications-actions"
                                                    >
                                                        <a
                                                            href="javascript:void(0)"
                                                            class="dropdown-notifications-read"
                                                        >
                                                            <span class="badge badge-dot"></span>
                                                        </a>
                                                        <a
                                                            href="javascript:void(0)"
                                                            class="dropdown-notifications-archive"
                                                        >
                                                            <span class="bx bx-x"></span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                            <li
                                                class="list-group-item list-group-item-action dropdown-notifications-item"
                                            >
                                                <div class="d-flex">
                                                    <div class="flex-shrink-0 me-3">
                                                        <div class="avatar">
                                                            <span
                                                                class="avatar-initial rounded-circle bg-label-success"
                                                            >
                                                                <i class="bx bx-cart"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div class="flex-grow-1">
                                                        <h6 class="mb-1">
                                                            Whoo! You have new order 🛒
                                                        </h6>
                                                        <p class="mb-0">
                                                            ACME Inc. made new order $1,154
                                                        </p>
                                                        <small class="text-muted">1 day ago</small>
                                                    </div>
                                                    <div
                                                        class="flex-shrink-0 dropdown-notifications-actions"
                                                    >
                                                        <a
                                                            href="javascript:void(0)"
                                                            class="dropdown-notifications-read"
                                                        >
                                                            <span class="badge badge-dot"></span>
                                                        </a>
                                                        <a
                                                            href="javascript:void(0)"
                                                            class="dropdown-notifications-archive"
                                                        >
                                                            <span class="bx bx-x"></span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                            <li
                                                class="list-group-item list-group-item-action dropdown-notifications-item marked-as-read"
                                            >
                                                <div class="d-flex">
                                                    <div class="flex-shrink-0 me-3">
                                                        <div class="avatar">
                                                            <img
                                                                src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/9.png"
                                                                alt
                                                                class="w-px-40 h-auto rounded-circle"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="flex-grow-1">
                                                        <h6 class="mb-1">
                                                            Application has been approved 🚀
                                                        </h6>
                                                        <p class="mb-0">
                                                            Your ABC project application has been
                                                            approved.
                                                        </p>
                                                        <small class="text-muted">2 days ago</small>
                                                    </div>
                                                    <div
                                                        class="flex-shrink-0 dropdown-notifications-actions"
                                                    >
                                                        <a
                                                            href="javascript:void(0)"
                                                            class="dropdown-notifications-read"
                                                        >
                                                            <span class="badge badge-dot"></span>
                                                        </a>
                                                        <a
                                                            href="javascript:void(0)"
                                                            class="dropdown-notifications-archive"
                                                        >
                                                            <span class="bx bx-x"></span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                            <li
                                                class="list-group-item list-group-item-action dropdown-notifications-item marked-as-read"
                                            >
                                                <div class="d-flex">
                                                    <div class="flex-shrink-0 me-3">
                                                        <div class="avatar">
                                                            <span
                                                                class="avatar-initial rounded-circle bg-label-success"
                                                            >
                                                                <i class="bx bx-pie-chart-alt"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div class="flex-grow-1">
                                                        <h6 class="mb-1">
                                                            Monthly report is generated
                                                        </h6>
                                                        <p class="mb-0">
                                                            July monthly financial report is
                                                            generated
                                                        </p>
                                                        <small class="text-muted">3 days ago</small>
                                                    </div>
                                                    <div
                                                        class="flex-shrink-0 dropdown-notifications-actions"
                                                    >
                                                        <a
                                                            href="javascript:void(0)"
                                                            class="dropdown-notifications-read"
                                                        >
                                                            <span class="badge badge-dot"></span>
                                                        </a>
                                                        <a
                                                            href="javascript:void(0)"
                                                            class="dropdown-notifications-archive"
                                                        >
                                                            <span class="bx bx-x"></span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                            <li
                                                class="list-group-item list-group-item-action dropdown-notifications-item marked-as-read"
                                            >
                                                <div class="d-flex">
                                                    <div class="flex-shrink-0 me-3">
                                                        <div class="avatar">
                                                            <img
                                                                src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/5.png"
                                                                alt
                                                                class="w-px-40 h-auto rounded-circle"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="flex-grow-1">
                                                        <h6 class="mb-1">
                                                            Send connection request
                                                        </h6>
                                                        <p class="mb-0">
                                                            Peter sent you connection request
                                                        </p>
                                                        <small class="text-muted">4 days ago</small>
                                                    </div>
                                                    <div
                                                        class="flex-shrink-0 dropdown-notifications-actions"
                                                    >
                                                        <a
                                                            href="javascript:void(0)"
                                                            class="dropdown-notifications-read"
                                                        >
                                                            <span class="badge badge-dot"></span>
                                                        </a>
                                                        <a
                                                            href="javascript:void(0)"
                                                            class="dropdown-notifications-archive"
                                                        >
                                                            <span class="bx bx-x"></span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                            <li
                                                class="list-group-item list-group-item-action dropdown-notifications-item"
                                            >
                                                <div class="d-flex">
                                                    <div class="flex-shrink-0 me-3">
                                                        <div class="avatar">
                                                            <img
                                                                src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/6.png"
                                                                alt
                                                                class="w-px-40 h-auto rounded-circle"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="flex-grow-1">
                                                        <h6 class="mb-1">New message from Jane</h6>
                                                        <p class="mb-0">
                                                            Your have new message from Jane
                                                        </p>
                                                        <small class="text-muted">5 days ago</small>
                                                    </div>
                                                    <div
                                                        class="flex-shrink-0 dropdown-notifications-actions"
                                                    >
                                                        <a
                                                            href="javascript:void(0)"
                                                            class="dropdown-notifications-read"
                                                        >
                                                            <span class="badge badge-dot"></span>
                                                        </a>
                                                        <a
                                                            href="javascript:void(0)"
                                                            class="dropdown-notifications-archive"
                                                        >
                                                            <span class="bx bx-x"></span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                            <li
                                                class="list-group-item list-group-item-action dropdown-notifications-item marked-as-read"
                                            >
                                                <div class="d-flex">
                                                    <div class="flex-shrink-0 me-3">
                                                        <div class="avatar">
                                                            <span
                                                                class="avatar-initial rounded-circle bg-label-warning"
                                                            >
                                                                <i class="bx bx-error"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div class="flex-grow-1">
                                                        <h6 class="mb-1">CPU is running high</h6>
                                                        <p class="mb-0">
                                                            CPU Utilization Percent is currently at
                                                            88.63%,
                                                        </p>
                                                        <small class="text-muted">5 days ago</small>
                                                    </div>
                                                    <div
                                                        class="flex-shrink-0 dropdown-notifications-actions"
                                                    >
                                                        <a
                                                            href="javascript:void(0)"
                                                            class="dropdown-notifications-read"
                                                        >
                                                            <span class="badge badge-dot"></span>
                                                        </a>
                                                        <a
                                                            href="javascript:void(0)"
                                                            class="dropdown-notifications-archive"
                                                        >
                                                            <span class="bx bx-x"></span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="dropdown-menu-footer border-top p-3">
                                        <button class="btn btn-primary text-uppercase w-100">
                                            view all notifications
                                        </button>
                                    </li>
                                </ul>
                            </li>
                            <!--/ Notification -->

                            <!-- User -->
                            <li class="nav-item navbar-dropdown dropdown-user dropdown">
                                <a
                                    class="nav-link dropdown-toggle hide-arrow"
                                    href="javascript:void(0);"
                                    data-bs-toggle="dropdown"
                                >
                                    <div class="avatar avatar-online">
                                        <img
                                            src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png"
                                            alt
                                            class="w-px-40 h-auto rounded-circle"
                                        />
                                    </div>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <a
                                            class="dropdown-item"
                                            href="pages-account-settings-account.html"
                                        >
                                            <div class="d-flex">
                                                <div class="flex-shrink-0 me-3">
                                                    <div class="avatar avatar-online">
                                                        <img
                                                            src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png"
                                                            alt
                                                            class="w-px-40 h-auto rounded-circle"
                                                        />
                                                    </div>
                                                </div>
                                                <div class="flex-grow-1">
                                                    <span class="fw-medium d-block">John Doe</span>
                                                    <small class="text-muted">Admin</small>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <div class="dropdown-divider"></div>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="pages-profile-user.html">
                                            <i class="bx bx-user me-2"></i>
                                            <span class="align-middle">My Profile</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            class="dropdown-item"
                                            href="pages-account-settings-account.html"
                                        >
                                            <i class="bx bx-cog me-2"></i>
                                            <span class="align-middle">Settings</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            class="dropdown-item"
                                            href="pages-account-settings-billing.html"
                                        >
                                            <span class="d-flex align-items-center align-middle">
                                                <i class="flex-shrink-0 bx bx-credit-card me-2"></i>
                                                <span class="flex-grow-1 align-middle">
                                                    Billing
                                                </span>
                                                <span
                                                    class="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20"
                                                >
                                                    4
                                                </span>
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <div class="dropdown-divider"></div>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="pages-faq.html">
                                            <i class="bx bx-help-circle me-2"></i>
                                            <span class="align-middle">FAQ</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="pages-pricing.html">
                                            <i class="bx bx-dollar me-2"></i>
                                            <span class="align-middle">Pricing</span>
                                        </a>
                                    </li>
                                    <li>
                                        <div class="dropdown-divider"></div>
                                    </li>
                                    <li>
                                        <a
                                            class="dropdown-item"
                                            href="#"
                                            @click.prevent="logout"
                                        >
                                            <i class="bx bx-power-off me-2"></i>
                                            <span class="align-middle">{{ $t('auth.logout') }}</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <!--/ User -->
                        </ul>
                    </div>
                </nav>

                <!-- / Navbar -->

                <!-- Content wrapper -->
                <div class="content-wrapper">
                    <!-- Content -->

                    <div class="container-fluid flex-grow-1 container-p-y">
                        <div class="h4 mb-4 py-3">
                            <template v-for="(crumb, i) in breadcrumbs" :key="i">
                                <Link v-if="crumb.href" :href="crumb.href" class="text-muted fw-light">
                                    {{ crumb.label }}
                                </Link>
                                <span v-else class="text-muted fw-light" :class="i === breadcrumbs.length - 1 ? 'text-purple-500' : ''">{{ crumb.label }}</span>
                                <span v-if="i < breadcrumbs.length - 1" class="mx-1 text-muted fw-light">/</span>
                            </template>
                        </div>

                        <slot></slot>
                    </div>
                    <!-- / Content -->

                    <!-- Footer -->
                    <footer class="content-footer footer bg-footer-theme">
                        <div
                            class="container-fluid d-flex justify-content-between flex-md-row flex-column flex-wrap py-2"
                        >
                            <div class="mb-md-0 mb-2">Laravel v12.32.5 (PHP v8.3.22)</div>
                        </div>
                    </footer>
                    <!-- / Footer -->

                    <div class="content-backdrop fade"></div>
                </div>
                <!-- Content wrapper -->
            </div>
            <!-- / Layout page -->
        </div>

        <!-- Overlay -->
        <div class="layout-overlay layout-menu-toggle"></div>

        <!-- Drag Target Area To SlideIn Menu On Small Screens -->
        <div class="drag-target"></div>
    </div>
    <!-- / Layout wrapper -->
</template>
<script setup>
    import { route } from 'ziggy-js';
    import { useAuth } from '@/composables/useAuth';
    import { inject } from 'vue';
    import { useTheme } from '@/composables/useTheme'
    import SidebarItems from '@/components/Dashboard/SidebarItems.vue';
    import { useBreadcrumbs } from '@/composables/useBreadcrumbs'
    import { Link } from '@inertiajs/vue3';

    const { logout } = useAuth();
    const locales = inject('$locales');
    const {theme, applyTheme, pageLoaded } = useTheme();

    const { breadcrumbs } = useBreadcrumbs()

    const setLocale = locale => {
        locales.setLocale(locale.getCode())
    }

</script>
