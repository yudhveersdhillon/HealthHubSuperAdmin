import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbIconLibraries, NbSidebarService } from '@nebular/theme';
import {
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbMenuItem,
  NbMenuService,
  NbThemeService,
} from '@nebular/theme';
import { filter } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private router: Router,
    private route: ActivatedRoute,
    private iconLibraries: NbIconLibraries,
    private breakpointService: NbMediaBreakpointsService
  ) {
    this.iconLibraries.registerFontPack('font-awesome', { packClass: 'fa' });

    iconLibraries.registerSvgPack('my-icon', {
      user: '<img src="assets/Components/user-solid.svg" width="15px">',
    });
  }

  ngOnInit(): void {
    this.menuService.onItemClick().subscribe((event) => {
      if (event.item.title === 'Log Out') {
        this.confirmDeleteBox();
      }
    });
  }

  menu: NbMenuItem[] = [
    {
      title: 'Dashboard',
      link: '/dashboard',
    },
    {
      title: 'Hospitals',
      link: '/hospitals',
    },
    {
      title: 'Doctors',
      link: '/doctors',
    },
    {
      title: 'Patients',
      link: '/patients',
    },
    {
      title: 'Log Out',
      data: { id: 'logout' },
    },
  ];

  confirmDeleteBox() {
    Swal.fire({
      title: 'Are you sure want to Logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#9a3fff',
    }).then((result: any) => {
      if (result.value) {
        this.LogOut();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    });
  }

  LogOut() {
    localStorage.removeItem('token');
    // sessionStorage.removeItem("Token");
    this.router.navigateByUrl('/login');
  }

  toggle() {
    this.sidebarService.toggle(false, 'left');
  }

  toggleCompact() {
    this.sidebarService.toggle(true, 'left');
  }
}
