import { Schema } from "mongoose";

export const DropDownItemSchema = new Schema({
    label: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
});



// Del Domicilio
export const TipoDomicilioSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
});


export const CodigosPostalesSchema = new Schema({
    d_codigo: {
        type: String,
        default: null
    },
    d_asenta: {
        type: String,
        default: null
    },
    c_tipo_asenta: {
        type: String,
        default: null
    },
    d_tipo_asenta: {
        type: String,
        default: null
    },
    c_mnpio: {
        type: String,
        default: null
    },
    D_mnpio: {
        type: String,
        default: null
    },
    c_estado: {
        type: String,
        default: null
    },
    d_estado: {
        type: String,
        default: null
    },
    c_cve_ciudad: {
        type: String,
        default: null
    },
    d_ciudad: {
        type: String,
        default: null
    },
    c_CP: {
        type: String,
        default: null
    },
    d_CP: {
        type: String,
        default: null
    },
    c_oficina: {
        type: String,
        default: null
    },
    id_asenta_cpcons: {
        type: String,
        default: null
    },
    d_zona: {
        type: String,
        default: null
    },
});


export const EntidadesFederativasMunicipiosSchema = new Schema({
    claveCURP: {
        type: String,
        default: null
    },
    claveINE: {
        type: String,
        default: null
    },
    claveINEGI: {
        type: String,
        default: null
    },
    claveUIF: {
        type: String,
        default: null
    },
    nombreCortoEntidad: {
        type: String,
        default: null
    },
    nombreOficialEntidad: {
        type: String,
        default: null
    },
    acronimoEntidad: {
        type: String,
        default: null
    },
    claveMunicipio: {
        type: String,
        default: null
    },
    nombreOficialMunicipio: {
        type: String,
        default: null
    },
    claveCabeceraMunicipal: {
        type: String,
        default: null
    },
    nombreOficialCabeceraMunicipal: {
        type: String,
        default: null
    },
    activo: {
        type: Boolean,
        required: false,
        default: true
    },
});


export const PaisesNacionalidadesSchema = new Schema({
    ISO__3166_1__alfa_3: {
        type: String,
        default: null
    },
    ISO__3166_1__alfa_2: {
        type: String,
        default: null
    },
    ISO__3166_1__numerico: {
        type: Number,
        default: null
    },
    nombreCorto: {
        type: String,
        default: null
    },
    articulo: {
        type: String,
        default: null
    },
    nombreOficial: {
        type: String,
        default: null
    },
    nacionalidad: {
        type: String,
        default: null
    },
    activo: {
        type: Boolean,
        required: false,
        default: true
    },
});



// Del Contacto
export const TipoTelefonoSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    }
});


export const TipoCorreoSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    }
});


export const TipoWebPageSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    }
});




// Del Poder
export const FacultadSchema = new Schema({
    idFacultad: {
        type: Number,
        required: true,
    },
    tipoPoder: {
        type: String,
        enum: ['general', 'especial', 'especial_irrevocable'],
        required: true,
    },
    facultad: {
        type: String,
        required: true,
    },
    grupo: {
        type: Number,
        default: null
    },
    activo: {
        type: Boolean,
        required: false,
        default: true
    },
});



export const TipoEstadoCivilSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    estadoCivilMasculino: {
        type: String,
        required: true,
    },
    activo: {
        type: Boolean,
        required: false,
        default: true
    },
});

export const TipoGeneroSchema = new Schema({
    cveCurp: {
        type: String,
        required: true,
    },
    cvePasaporte: {
        type: String,
        required: true,
    },
    docMigratorio: {
        type: String,
        required: true,
    },
    cveElector: {
        type: String,
        required: true,
    },
    genero: {
        type: String,
        required: true,
    },
    articuloSingular: {
        type: String,
        required: true,
    },
    articuloPlural: {
        type: String,
        required: true,
    },
    articuloCombinados: {
        type: String,
        required: true,
    }
});



export const TipoRegimenLegalSchema = new Schema({
    codigo: {
        type: Number,
        required: true,
    },
    regimenLegal: {
        type: String,
        required: true,
    },
    abreviatura: {
        type: String,
        default: null
    },
    activo: {
        type: Boolean,
        required: false,
        default: true
    },
});


export const TipoAntecedenteCorporativoSchema = new Schema({
    tipoEntidad: {
        type: String,
        required: true,
    },
    idTipoAntecedente: {
        type: Number,
        required: true,
    },
    tipoAntecedente: {
        type: String,
        required: true
    },
    idSubTipoAntecedente: {
        type: String,
        default: null
    },
    subTipoAntecedente: {
        type: String,
        default: null
    },
    activo: {
        type: Boolean,
        required: false,
        default: true
    },
});


export const TipoRelacionSchema = new Schema({
    codigo: {
        type: Number,
        required: true,
    },
    masculino: {
        type: String,
        required: true,
    },
    femenino: {
        type: String,
        required: true,
    },
    plural: {
        type: String,
        required: true,
    },
});

export const OcupacionesSchema = new Schema({
    codigo: {
        type: Number,
        required: true,
    },
    actividadEconomica: {
        type: String,
        required: true,
    },
    ocupacion: {
        type: String,
        required: true,
    },
    activo: {
        type: Boolean,
        required: false,
        default: true
    },
});

export const TipoActividadEconomicaSchema = new Schema({
    codigo: {
        type: String,
        required: true,
    },
    actividadEconomica: {
        type: String,
        required: true,
    },
    codigoUIF: {
        type: String,
        default: null
    },
    giroMercantil: {
        type: String,
        default: null
    },
    activo: {
        type: Boolean,
        required: false,
        default: true
    },
});

export const CatRegimenConyugalSchema = new Schema({
    num: {
        type: Number,
        default: null
    },
    numEstadoCivil: {
        type: Number,
        default: null
    },
    regimenConyugal: {
        type: String,
        default: null
    },
    activo: {
        type: Boolean,
        required: false,
        default: true
    },
});

export const EntidadEmisoraSchema = new Schema({
    codigo: {
        type: Number,
        default: null,
    },
    entidadEmisora: {
        type: String,
        default: null,
    },
    activo: {
        type: Boolean,
        required: false,
        default: true
    },
});

export const TipoDocumentoSoporteSchema = new Schema({
    codigo: {
        type: Number,
        default: null,
    },
    docSoporte: {
        type: String,
        default: null,
    },
    tipo: {
        type: String,
        required: true
    }
});

export const TipoContactoSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    activo: {
        type: Boolean,
        required: false,
        default: true
    },
});

export const GrupoCorporativoSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    grupoCorporativo: {
        type: String,
        required: true
    },
    activo: {
        type: Boolean,
        required: false,
        default: true
    },
});

export const FiduciarioSchema = new Schema({
    claveSAT: {
        type: String,
        required: true
    },
    nombreCorto: {
        type: String,
        required: true
    },
    razonSocial: {
        type: String,
        required: true
    },
    activo: {
        type: Boolean,
        required: false,
        default: true
    },
});

export const AntecedenteFiduciarioSchema = new Schema({
    num: {
        type: Number,
        required: true
    },
    tipoAntecedenteFiduciario: {
        type: String,
        required: true
    },
    activo: {
        type: Boolean,
        required: false,
        default: true
    },

});

export const NotariosMexicoSchema = new Schema({
    codigo: { type: String, required: true },
    numNotaria: { type: String, required: true },
    claveInegiMunicipio: { type: String, default: null },
    municipio: { type: String, default: null },
    claveInegiEntidadFederativa: { type: String, required: true },
    entidad: { type: String, required: true },
    gentilicio: { type: String, required: true },
    nombreCompleto: { type: String, required: true },
    estatus: { type: String, default: null },
    activo: { type: Boolean, required: false, default: true },
});

export const DropDownGroupSchema = ({
    label: { type: String, required: true },
    value: { type: String, required: true },
    group: { type: String, default: null },
})

export const CaracterNotarioSchema = new Schema({
    codigo: { type: String, required: true },
    caracterNotario: { type: String, required: true },
})


export const EntidadesRegistradorasSchema = new Schema({
    codigo: { type: String, required: true },
    estado: { type: String, required: true },
    registroPublico: { type: String, required: true },
});

export const TiposEscriturasSchema = new Schema({
    codigo: { type: String, required: true },
    nombre: { type: String, required: true },
});

export const OrigenesEscriturasSchema = new Schema({
    codigo: { type: String, required: true },
    nombre: { type: String, required: true },
});


export const OrganosAdministradoresSchema = new Schema({
    codigo: {
        type: String,
        required: true,
    },
    organoAdministracion: {
        type: String,
        required: true,
    },
});

export const TiposMonedasSchema = new Schema({
    codigo: {
        type: String,
        required: true,
    },
    tipoMoneda: {
        type: String,
        required: true,
    },
});

export const TiposFideicomisosSchema = new Schema({
    codigo: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
});

export const SubTiposFideicomisosSchema = new Schema({
    codigo: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
});

export const TiposPersonaMoralSchema = new Schema({
    codigo: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
});

export const NacionalidadPersonaMoralSchema = new Schema({
    codigo: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
});