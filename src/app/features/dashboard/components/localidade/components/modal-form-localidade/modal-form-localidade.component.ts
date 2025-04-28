import { Component, DestroyRef, inject, Inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { RequestCityDTO } from '../../../../../../core/dtos/RequestCityDTO';
import { City } from '../../../../../../core/models/City';
import { Mesorregiao } from '../../../../../../core/models/Mesorregiao';
import { State } from '../../../../../../core/models/State';
import { CityService } from '../../../../../../shared/services/city.service';
import { MesorregiaoService } from '../../../../../../shared/services/mesorregiao.service';
import { StateService } from '../../../../../../shared/services/state.service';

@Component({
  selector: 'app-modal-form-localidade',
  templateUrl: './modal-form-localidade.component.html',
  styleUrl: './modal-form-localidade.component.scss',
})
export class ModalFormLocalidadeComponent implements OnInit {
  cityForm!: FormGroup;
  titleForm!: string;
  statesOptions: State[] = [];
  mesorregioesOptions: Mesorregiao[] = [];
  errorMessage: string = '';
  loading: boolean = false;
  private destroyRef = inject(DestroyRef);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _ref: MatDialogRef<ModalFormLocalidadeComponent>,
    private _fb: FormBuilder,
    private _cityService: CityService,
    private _stateService: StateService,
    private _mesorregiaoService: MesorregiaoService,
    private _toastr: ToastrService
  ) {}

  ngOnInit() {
    this.initForm();
    this.titleForm = this.data.titleModal;
    this.loadStates();

    //data.id 0 é codigo para um nova localidade
    if (this.data.id !== 0) {
      this.setModalData(this.data.id);
    }
  }

  private setModalData(idCidade: number) {
    this.loading = true;

    this._cityService
    .getCityById(idCidade)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (city: City) => {
        this.cityForm.patchValue({
          nome_cidade: city.nome_cidade,
          estado_id: city.estado.id,
          mesorregiao_id: city.mesorregiao.id,
        });

        this.searchMesorregioesByIdState(city.estado.id);
      },
      error: () => {
        this.loading = false;
        this._toastr.error('', 'Erro ao buscar arquivo');
        this.closeModal();
      },
    });
  }

  private initForm() {
    this.cityForm = this._fb.group({
      nome_cidade: ['', Validators.required],
      estado_id: [null, Validators.required],
      mesorregiao_id: [null, Validators.required],
    });
  }

  private loadStates() {
    this._stateService
    .list()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (estados: State[]) => {
        this.statesOptions = estados;
      },
      error: (err) => console.error(err),
    });
  }

  private loadMesorregiao() {
    this._mesorregiaoService
    .list()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (mesorregioes: Mesorregiao[]) => {
        this.mesorregioesOptions = mesorregioes;
      },
      error: (err) => console.error(err),
    });
  }

  stateSelected(event: MatSelectChange) {
    const idStateSelected = event.value as number;
    this.searchMesorregioesByIdState(idStateSelected);
  }

  private searchMesorregioesByIdState(idState: number) {
    this._mesorregiaoService
    .listarMesorregiaoPeloIdEstado(idState)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (mesorregioes: Mesorregiao[]) => {
        this.mesorregioesOptions = mesorregioes;
      },
    });
  }

  closeModal() {
    this._ref.close();
  }

  onSubmit() {
    if (this.cityForm.valid) {
      const cityData = this.cityForm.value as RequestCityDTO;

      if (this.data.id === 0) {
        this._cityService
        .registrerCity(cityData)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this._toastr.success('', 'Cidade cadastrada com sucesso');
            this.cityForm.reset();
          },
          error: (error) => {
            switch (error?.error?.status) {
              case 409:
                this._toastr.error(
                  error?.error?.detail,
                  'Erro ao cadastrar cidade'
                );
                break;
              default:
                this._toastr.error('', 'Erro ao cadastrar cidade');
            }
          },
        });
      } else {
        this._cityService
        .editCityById(this.data.id, cityData)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this._toastr.success('', 'Cidade editada com sucesso');
            this.closeModal();
          },
          error: (error) => {
            switch (error?.error?.status) {
              case 409:
                this._toastr.error(
                  error?.error?.detail,
                  'Erro ao editar cidade'
                );
                break;
              default:
                this._toastr.error('', 'Erro ao editar cidade');
            }
          },
        });
      }
    }
  }
}
