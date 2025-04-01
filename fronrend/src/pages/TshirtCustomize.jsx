import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

const TshirtCustomize = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [tshirtColor, setTshirtColor] = useState('#FFFFFF');
  const [designPosition, setDesignPosition] = useState('front');
  const [needsLogo, setNeedsLogo] = useState(false);
  const [logoText, setLogoText] = useState('');
  const [customText, setCustomText] = useState('');
  const [designStyle, setDesignStyle] = useState('minimal');
  const [designName, setDesignName] = useState('');
  const [size, setSize] = useState('M');
  const [editingDesign, setEditingDesign] = useState(null);

  useEffect(() => {
    try {
      if (state?.design) {
        const design = state.design;
        setTshirtColor(design.color || '#FFFFFF');
        setDesignPosition(design.position || 'front');
        setNeedsLogo(!!design.logo);
        setLogoText(design.logo || '');
        setCustomText(design.design || '');
        setDesignStyle('minimal');
        setDesignName(design.name || '');
        setSize(design.size || 'M');
        setEditingDesign(design);
      }
    } catch (error) {
      console.error('Error in useEffect:', error);
      toast.error('Failed to load design for editing');
    }
  }, [state]);

  const handleColorChange = (value) => {
    setTshirtColor(value);
    toast(`T-shirt color changed to ${value}`);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your design? All changes will be lost.')) {
      setTshirtColor('#FFFFFF');
      setDesignPosition('front');
      setNeedsLogo(false);
      setLogoText('');
      setCustomText('');
      setDesignStyle('minimal');
      setDesignName('');
      setSize('M');
      setEditingDesign(null);
      toast("Design has been reset.");
    }
  };

  const handleSave = async () => {
    if (!designName.trim()) {
      toast.error("Please provide a name for your design");
      return;
    }

    const designData = {
      name: designName,
      size,
      color: tshirtColor,
      design: customText,
      position: designPosition,
      logo: needsLogo ? logoText : '',
    };

    try {
      if (editingDesign) {
        await axios.put(`http://localhost:5000/api/tshirts/designs/${editingDesign._id}`, designData);
        toast.success("Design updated successfully!");
      } else {
        await axios.post('http://localhost:5000/api/tshirts/designs', designData);
        toast.success("Design saved successfully!");
      }
      navigate('/tshirt-view');
    } catch (error) {
      toast.error("Error saving design");
      console.error('Error saving design:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
  };

  return (
    <>
      <style>
        {`
          .custom-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .form-section {
            order: 1;
          }
          .preview-section {
            order: 2;
            display: flex;
            justify-content: center;
          }
          @media (min-width: 768px) {
            .custom-grid {
              grid-template-columns: 1fr 1fr;
            }
            .form-section {
              order: 1;
            }
            .preview-section {
              order: 2;
            }
          }
        `}
      </style>
      <div style={{ paddingTop: '4rem', paddingLeft: '1rem', paddingRight: '1rem', maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '600', color: '#14b8a6' }}>Customize Your T-Shirt</h1>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Button
              variant="outline"
              onClick={handleReset}
              style={{
                backgroundColor: '#6b7280',
                color: '#ffffff',
                border: '1px solid #6b7280',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#4b5563')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#6b7280')}
            >
              Reset Design
            </Button>
            <Button
              onClick={handleSave}
              style={{
                backgroundColor: '#14b8a6',
                color: '#ffffff',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0f766e')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#14b8a6')}
            >
              {editingDesign ? 'Update Design' : 'Save Design'}
            </Button>
          </div>
        </div>

        <div className="custom-grid">
          <div
            className="form-section"
            style={{
              backgroundColor: '#f9fafb',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
            }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <Label htmlFor="design-name" style={{ fontSize: '1.125rem', fontWeight: '500', color: '#374151' }}>
                    Design Name
                  </Label>
                  <Input
                    id="design-name"
                    value={designName}
                    onChange={(e) => setDesignName(e.target.value)}
                    placeholder="Enter a name for your design"
                    style={{
                      width: '100%',
                      marginTop: '0.25rem',
                      padding: '0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#14b8a6')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#d1d5db')}
                  />
                </div>

                <div>
                  <Label htmlFor="size" style={{ fontSize: '1.125rem', fontWeight: '500', color: '#374151' }}>
                    Size
                  </Label>
                  <Select value={size} onValueChange={setSize}>
                    <SelectTrigger
                      id="size"
                      style={{
                        width: '100%',
                        marginTop: '0.25rem',
                        padding: '0.5rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#14b8a6')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#d1d5db')}
                    >
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <SelectItem value="S">S</SelectItem>
                      <SelectItem value="M">M</SelectItem>
                      <SelectItem value="L">L</SelectItem>
                      <SelectItem value="XL">XL</SelectItem>
                      <SelectItem value="XXL">XXL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tshirt-color" style={{ fontSize: '1.125rem', fontWeight: '500', color: '#374151' }}>
                    T-Shirt Color
                  </Label>
                  <Select value={tshirtColor} onValueChange={handleColorChange}>
                    <SelectTrigger
                      id="tshirt-color"
                      style={{
                        width: '100%',
                        marginTop: '0.25rem',
                        padding: '0.5rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#14b8a6')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#d1d5db')}
                    >
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <SelectItem value="#FFFFFF">White</SelectItem>
                      <SelectItem value="#000000">Black</SelectItem>
                      <SelectItem value="#FF0000">Red</SelectItem>
                      <SelectItem value="#0000FF">Blue</SelectItem>
                      <SelectItem value="#00FF00">Green</SelectItem>
                      <SelectItem value="#FFFF00">Yellow</SelectItem>
                      <SelectItem value="#800080">Purple</SelectItem>
                      <SelectItem value="#FFA500">Orange</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label style={{ fontSize: '1.125rem', fontWeight: '500', color: '#374151' }}>
                    Design Position
                  </Label>
                  <RadioGroup
                    value={designPosition}
                    onValueChange={setDesignPosition}
                    style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <RadioGroupItem
                        value="front"
                        id="front"
                        style={{
                          border: '2px solid #d1d5db',
                          borderRadius: '50%',
                          width: '1.25rem',
                          height: '1.25rem',
                        }}
                      />
                      <Label htmlFor="front" style={{ fontSize: '1.125rem', color: '#374151' }}>
                        Front
                      </Label>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <RadioGroupItem
                        value="back"
                        id="back"
                        style={{
                          border: '2px solid #d1d5db',
                          borderRadius: '50%',
                          width: '1.25rem',
                          height: '1.25rem',
                        }}
                      />
                      <Label htmlFor="back" style={{ fontSize: '1.125rem', color: '#374151' }}>
                        Back
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <Checkbox
                    id="logo"
                    checked={needsLogo}
                    onCheckedChange={(checked) => setNeedsLogo(checked === true)}
                    style={{
                      border: '2px solid #d1d5db',
                      borderRadius: '0.25rem',
                      width: '1.25rem',
                      height: '1.25rem',
                    }}
                  />
                  <div style={{ display: 'grid', gap: '0.375rem' }}>
                    <Label
                      htmlFor="logo"
                      style={{ cursor: 'pointer', fontSize: '1.125rem', fontWeight: '500', color: '#374151' }}
                    >
                      Include Logo
                    </Label>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      Add your company or personal logo
                    </p>
                  </div>
                </div>

                {needsLogo && (
                  <div>
                    <Label htmlFor="logo-text" style={{ fontSize: '1.125rem', fontWeight: '500', color: '#374151' }}>
                      Logo Text
                    </Label>
                    <Input
                      id="logo-text"
                      value={logoText}
                      onChange={(e) => setLogoText(e.target.value)}
                      placeholder="Enter your logo text"
                      style={{
                        width: '100%',
                        marginTop: '0.25rem',
                        padding: '0.5rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#14b8a6')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#d1d5db')}
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="custom-text" style={{ fontSize: '1.125rem', fontWeight: '500', color: '#374151' }}>
                    Custom Text
                  </Label>
                  <Textarea
                    id="custom-text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="Enter the text you want on your t-shirt"
                    style={{
                      minHeight: '100px',
                      width: '100%',
                      marginTop: '0.25rem',
                      padding: '0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#14b8a6')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#d1d5db')}
                  />
                </div>
              </div>

              <div style={{ paddingTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Button
                  type="submit"
                  style={{
                    width: '100%',
                    backgroundColor: '#14b8a6',
                    color: '#ffffff',
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0f766e')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#14b8a6')}
                >
                  {editingDesign ? 'Update Design' : 'Save Design'}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  style={{
                    width: '100%',
                    backgroundColor: '#6b7280',
                    color: '#ffffff',
                    border: '1px solid #6b7280',
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    transition: 'background-color 0.2s',
                  }}
                  onClick={() => navigate('/tshirt-view')}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#4b5563')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#6b7280')}
                >
                  View Saved Designs
                </Button>
              </div>
            </form>
          </div>

          <div
            className="preview-section"
            style={{
              backgroundColor: '#f9fafb',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
            }}
          >
            <h2 style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '1rem', color: '#14b8a6' }}>
              T-Shirt Preview
            </h2>
            <div
              style={{
                position: 'relative',
                width: '200px',
                height: '200px',
                backgroundColor: '#ffffff',
                borderRadius: '0.375rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              }}
            >
              <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
                <path
                  d="M50,20 H150 L180,60 H160 V160 H40 V60 H20 Z"
                  fill={tshirtColor}
                  stroke="#ddd"
                  strokeWidth="1"
                />
                <path
                  d="M20,60 L50,20 L50,60 Z M150,20 L180,60 L150,60 Z"
                  fill={tshirtColor}
                  stroke="#ddd"
                  strokeWidth="1"
                />
                <path
                  d="M80,20 Q100,30 120,20"
                  fill="none"
                  stroke="#ddd"
                  strokeWidth="2"
                />
              </svg>
              {customText && (
                <div
                  style={{
                    position: 'absolute',
                    width: '100%',
                    textAlign: 'center',
                    fontWeight: '500',
                    top: designPosition === 'front' ? '30%' : '70%',
                    color: tshirtColor === '#FFFFFF' ? '#000000' : '#FFFFFF',
                    fontSize: '14px',
                  }}
                >
                  {customText}
                </div>
              )}
              {needsLogo && logoText && (
                <div
                  style={{
                    position: 'absolute',
                    width: '100%',
                    textAlign: 'center',
                    fontWeight: '700',
                    top: designPosition === 'front' ? '70%' : '30%',
                    color: tshirtColor === '#FFFFFF' ? '#000000' : '#FFFFFF',
                    fontSize: '12px',
                  }}
                >
                  {logoText}
                </div>
              )}
            </div>
            </div>

          <div
            className="preview-section"
            style={{
              backgroundColor: '#f9fafb',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
            }}
          >
            <h2 style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '1rem', color: '#14b8a6' }}>
              T-Shirt Preview
            </h2>
            <div
              style={{
                position: 'relative',
                width: '200px',
                height: '200px',
                backgroundColor: '#ffffff',
                borderRadius: '0.375rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              }}
            >
              <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
                <path
                  d="M50,20 H150 L180,60 H160 V160 H40 V60 H20 Z"
                  fill={tshirtColor}
                  stroke="#ddd"
                  strokeWidth="1"
                />
                <path
                  d="M20,60 L50,20 L50,60 Z M150,20 L180,60 L150,60 Z"
                  fill={tshirtColor}
                  stroke="#ddd"
                  strokeWidth="1"
                />
                <path
                  d="M80,20 Q100,30 120,20"
                  fill="none"
                  stroke="#ddd"
                  strokeWidth="2"
                />
              </svg>
              {customText && (
                <div
                  style={{
                    position: 'absolute',
                    width: '100%',
                    textAlign: 'center',
                    fontWeight: '500',
                    top: designPosition === 'front' ? '30%' : '70%',
                    color: tshirtColor === '#FFFFFF' ? '#000000' : '#FFFFFF',
                    fontSize: '14px',
                  }}
                >
                  {customText}
                </div>
              )}
              {needsLogo && logoText && (
                <div
                  style={{
                    position: 'absolute',
                    width: '100%',
                    textAlign: 'center',
                    fontWeight: '700',
                    top: designPosition === 'front' ? '70%' : '30%',
                    color: tshirtColor === '#FFFFFF' ? '#000000' : '#FFFFFF',
                    fontSize: '12px',
                  }}
                >
                  {logoText}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TshirtCustomize;