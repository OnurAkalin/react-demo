import {useEffect, useState} from 'react';
import {brandService} from '../services/api';

function BrandList() {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingBrand, setEditingBrand] = useState(null);
    const [formData, setFormData] = useState({id: '', name: ''});

    useEffect(() => {
        loadBrands();
    }, []);

    const loadBrands = async () => {
        try {
            setLoading(true);
            const response = await brandService.getAll();
            setBrands(response.data.data);
        } catch (error) {
            console.error('Markalar yüklenirken hata:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingBrand) {
                await brandService.update(formData);
            } else {
                await brandService.create(formData);
            }
            loadBrands();
            resetForm();
        } catch (error) {
            console.error('Kaydetme hatası:', error);
            resetForm();
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bu markayı silmek istediğinizden emin misiniz?')) {
            try {
                await brandService.delete(id);
                loadBrands();
            } catch (error) {
                console.error('Silme hatası:', error);
            }
        }
    };

    const handleEdit = (brand) => {
        setEditingBrand(brand);
        setFormData({id: brand.id, name: brand.name});
        setShowForm(true);
    };

    const resetForm = () => {
        setFormData({name: ''});
        setEditingBrand(null);
        setShowForm(false);
    };

    if (loading) {
        return <div className="loading">Yükleniyor...</div>;
    }

    return (<div className="page-container">
        <div className="page-header">
            <h2>Markalar</h2>
            <button
                className="btn btn-primary"
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? 'İptal' : 'Yeni Marka Ekle'}
            </button>
        </div>

        {showForm && (<div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Marka Adı:</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                        placeholder="Örn: BMW, Audi"
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn btn-success">
                        {editingBrand ? 'Güncelle' : 'Ekle'}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={resetForm}>
                        İptal
                    </button>
                </div>
            </form>
        </div>)}

        <div className="table-container">
            <table className="data-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Marka Adı</th>
                    <th>İşlemler</th>
                </tr>
                </thead>
                <tbody>
                {brands.length === 0 ? (<tr>
                    <td colSpan="4" className="no-data">Henüz marka eklenmemiş</td>
                </tr>) : (brands.map(brand => (<tr key={brand.id}>
                    <td>{brand.id}</td>
                    <td>{brand.name}</td>
                    <td>
                        <button
                            className="btn btn-sm btn-warning"
                            onClick={() => handleEdit(brand)}
                        >
                            Düzenle
                        </button>
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(brand.id)}
                        >
                            Sil
                        </button>
                    </td>
                </tr>)))}
                </tbody>
            </table>
        </div>
    </div>);
}

export default BrandList;