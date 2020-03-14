import { Component, OnInit } from '@angular/core';
import { MyAppService } from '../my-app.service';
// import { Router } from '@angular/router'; //수정0315

declare var $: any;

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  previewData;

  constructor(
    private myAppService: MyAppService,
    // private router: Router //수정0315
  ) { }
  
  /* 초기화 */
  ngOnInit() {
    /* 프리뷰 데이터 받기 */
    this.previewData = this.myAppService.getPreviewData();

    /* 폰트 조정 jquery */
    $(document).ready(function () {
      
      for(var i = 0; i < $('.document').length; i++) {
        while ($('#doc'+i+' .a div').height() > $('#doc'+i+' .a').height()) {
          $('#doc'+i+' .a div').css('font-size', (parseInt($('#doc'+i+' .a div').css('font-size')) - 2) + "px");
        }
        while ($('#doc'+i+' .b div').height() > $('#doc'+i+' .b').height()) {
          $('#doc'+i+' .b div').css('font-size', (parseInt($('#doc'+i+' .b div').css('font-size')) - 2) + "px");
        }
        while ($('#doc'+i+' .c1 div').height() > $('#doc'+i+' .c1').height()) {
          $('#doc'+i+' .c1 div').css('font-size', (parseInt($('#doc'+i+' .c1 div').css('font-size')) - 2) + "px");
        }
        while ($('#doc'+i+' .c2 div').height() > $('#doc'+i+' .c2').height()) {
          $('#doc'+i+' .c2 div').css('font-size', (parseInt($('#doc'+i+' .c2 div').css('font-size')) - 2) + "px");
        }
        while ($('#doc'+i+' .d div').height() > $('#doc'+i+' .d').height()) {
          $('#doc'+i+' .d div').css('font-size', (parseInt($('#doc'+i+' .d div').css('font-size')) - 2) + "px");
        }
      }
      $('.document').css("color", "black");
      $('.spinner-border').css("display", "none");
    });
  }

  /* 출력 */
  dataPrint() {
    // $('.document').css({"background":"url()"}); //수정0315
    setTimeout(() => {
      window.print();
      // this.router.navigateByUrl(''); //수정0315
    })
  }

}
