import java.awt.*;
import java.awt.event.*;
import java.io.*;

import javax.swing.*;

public class Generateur_de_cartes extends JPanel implements ItemListener{
    private static final long serialVersionUID = 1L;
    private JTextField dir = new JTextField();

    JPanel Panel;
    JButton bouton = new JButton("Créer la carte");
    String name;
    JFileChooser fc;
    String[] card_types={
        "La malice","La chance",
        "Fruits","Légumes",
        "Plat","Petit-déjeuner/Goûter"};
    JLabel  lblType  = new JLabel("Type de carte", JLabel.RIGHT);
	
    String[] booleans={"Oui","Non"};
    String[] Actions={"Passe Tour","Mélange et pioche", "Quiz"};

	String texte="";


    public Generateur_de_cartes(String name) {
        this.name = name;
        this.setSize(640, 480);
        this.add(new JLabel(name));
    }
    
    public void addComponentToPane(Container pane) {
        //Put the JComboBox in a JPanel to get a nicer look.
        JPanel comboBoxPane = new JPanel(); //use FlowLayout
    	JComboBox<String> cards = new JComboBox<String>(card_types);
        cards.setEditable(false);
        cards.addItemListener(this);
        comboBoxPane.add(cards);
        //Name the TextFields
        JTextField Flavor_malice=new JTextField("", 20);
        JComboBox<String> Action_malice = new JComboBox<String>(Actions);
        //Create the "cards".
        JPanel card1 = new JPanel(); //La malice
        SpringLayout layout1 = new SpringLayout();
        card1.setLayout(layout1);
        JLabel label_malice1 = new JLabel("Texte", JLabel.LEFT);
        card1.add(label_malice1);
        card1.add(Flavor_malice);
        layout1.putConstraint(SpringLayout.WEST, label_malice1,5,SpringLayout.WEST, card1);
        layout1.putConstraint(SpringLayout.NORTH, label_malice1,5,SpringLayout.NORTH, card1);
        layout1.putConstraint(SpringLayout.WEST, Flavor_malice,5,SpringLayout.EAST, label_malice1);
        layout1.putConstraint(SpringLayout.NORTH, Flavor_malice,5,SpringLayout.NORTH, card1);
        
        JLabel label_malice2 =new JLabel("Action", JLabel.LEFT);
        layout1.putConstraint(SpringLayout.SOUTH, label_malice2,30,SpringLayout.SOUTH, label_malice1);
        layout1.putConstraint(SpringLayout.WEST, label_malice2,5,SpringLayout.WEST, card1);
        card1.add(label_malice2);

        layout1.putConstraint(SpringLayout.WEST, Action_malice,5,SpringLayout.EAST, label_malice2);
        layout1.putConstraint(SpringLayout.SOUTH, Action_malice,30,SpringLayout.SOUTH, Flavor_malice);
        
        
        card1.add(Action_malice);
        
        JTextField filename_malice = new JTextField("",20);
        JLabel label_malice3 = new JLabel("Image", JLabel.LEFT);
        card1.add(label_malice3);
        JButton img_malice = new JButton("Choisir");
        layout1.putConstraint(SpringLayout.WEST, label_malice3,5,SpringLayout.WEST, card1);
        layout1.putConstraint(SpringLayout.SOUTH, label_malice3,30,SpringLayout.SOUTH, label_malice2);
        layout1.putConstraint(SpringLayout.WEST, filename_malice,5,SpringLayout.EAST,label_malice3);
        layout1.putConstraint(SpringLayout.SOUTH, filename_malice,30,SpringLayout.SOUTH, Action_malice);
        layout1.putConstraint(SpringLayout.WEST,img_malice ,5,SpringLayout.EAST,filename_malice);
        layout1.putConstraint(SpringLayout.SOUTH, img_malice,30,SpringLayout.SOUTH, Action_malice);
        

        JPanel card1_1 = new JPanel();
        JPanel card1_2 = new JPanel();
		JLabel label_melange= new JLabel("Melange:");
		JTextField question_melange_malice = new JTextField("",20);
		JLabel label_pioche= new JLabel("Pioche:");
		JComboBox<String> question_pioche_malice = new JComboBox<String>(card_types);
		card1_2.add(label_melange);
		card1_2.add(question_melange_malice);
		card1_2.add(label_pioche);
		card1_2.add(question_pioche_malice);

		JLabel label_question_malice= new JLabel("Question:");
		JTextField question_malice= new JTextField("",10);
		JRadioButton label_reponse1_malice= new JRadioButton("Réponse 1:");
		JTextField reponse1_malice= new JTextField("",10);
		JRadioButton label_reponse2_malice= new JRadioButton("Réponse 2:");
		JTextField reponse2_malice= new JTextField("",10);
		JRadioButton label_reponse3_malice= new JRadioButton("Réponse 3:");
		JTextField reponse3_malice= new JTextField("",10);
		JRadioButton label_reponse4_malice= new JRadioButton("Réponse 4:");
		JTextField reponse4_malice= new JTextField("",10);
		
		ButtonGroup reponse_malice = new ButtonGroup();

        JPanel card1_3 = new JPanel();

		
		
		reponse_malice.add(label_reponse1_malice);
		reponse_malice.add(label_reponse2_malice);
		reponse_malice.add(label_reponse3_malice);
		reponse_malice.add(label_reponse4_malice);

		card1_3.add(label_question_malice);
		card1_3.add(question_malice);
		card1_3.add(label_reponse1_malice);
		card1_3.add(reponse1_malice);
		
		card1_3.add(label_reponse2_malice);
		card1_3.add(reponse2_malice);
		card1_3.add(label_reponse3_malice);
		card1_3.add(reponse3_malice);
		card1_3.add(label_reponse4_malice);
		card1_3.add(reponse4_malice);

        JPanel Choix_Malice = new JPanel(new CardLayout());
        
		Choix_Malice.add(card1_1, Actions[0]);
		Choix_Malice.add(card1_2, Actions[1]);
		Choix_Malice.add(card1_3, Actions[2]);
		
		layout1.putConstraint(SpringLayout.WEST, Choix_Malice,5,SpringLayout.WEST, card1);
        layout1.putConstraint(SpringLayout.SOUTH, Choix_Malice,40,SpringLayout.SOUTH, img_malice);
		
		card1.add(Choix_Malice);
		
		Action_malice.addItemListener(new ItemListener() {
			
			@Override
			public void itemStateChanged(ItemEvent evt) {
		        CardLayout cl = (CardLayout)(Choix_Malice.getLayout());
		        cl.show(Choix_Malice, (String)evt.getItem());
		    }
		});

        img_malice.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent arg0) {
				// TODO Auto-generated method stub

		        JFileChooser c= new JFileChooser();
		        int rVal = c.showOpenDialog(Generateur_de_cartes.this);
		        if (rVal == JFileChooser.APPROVE_OPTION) {
		        	filename_malice.setText(c.getCurrentDirectory().toString()+"\\"+c.getSelectedFile().getName());
		            System.out.println(filename_malice.getText());
		          }
		          if (rVal == JFileChooser.CANCEL_OPTION) {
		        	  filename_malice.setText("");
		          }
			}
		});
        filename_malice.setEditable(false);
        card1.add(filename_malice);
        card1.add(img_malice);

         
        JPanel card2 = new JPanel(); // La chance
        JComboBox<String> Action_chance = new JComboBox<String>(Actions);
        SpringLayout layout2 = new SpringLayout();
        card2.setLayout(layout2);
        JLabel label_chance1 = new JLabel("Texte", JLabel.LEFT);
        JTextField Flavor_chance=new JTextField("", 20);
        card2.add(label_chance1);
        card2.add(Flavor_chance);
        layout2.putConstraint(SpringLayout.WEST, label_chance1,5,SpringLayout.WEST, card2);
        layout2.putConstraint(SpringLayout.NORTH, label_chance1,5,SpringLayout.NORTH, card2);
        layout2.putConstraint(SpringLayout.WEST, Flavor_chance,5,SpringLayout.EAST, label_chance1);
        layout2.putConstraint(SpringLayout.NORTH, Flavor_chance,5,SpringLayout.NORTH, card2);
        
        JLabel label_chance2 =new JLabel("Action", JLabel.LEFT);
        layout2.putConstraint(SpringLayout.SOUTH, label_chance2,30,SpringLayout.SOUTH, label_chance1);
        layout2.putConstraint(SpringLayout.WEST, label_chance2,5,SpringLayout.WEST, card2);
        card2.add(label_chance2);

        layout2.putConstraint(SpringLayout.WEST, Action_chance,5,SpringLayout.EAST, label_chance2);
        layout2.putConstraint(SpringLayout.SOUTH, Action_chance,30,SpringLayout.SOUTH, Flavor_chance);
        
        card2.add(Action_chance);
        
        
        JLabel label_chance3 = new JLabel("Image", JLabel.LEFT);
        JTextField filename_chance = new JTextField("",20);
        card2.add(label_chance3);
        JButton img_chance = new JButton("Choisir");
        layout2.putConstraint(SpringLayout.WEST, label_chance3,5,SpringLayout.WEST, card2);
        layout2.putConstraint(SpringLayout.SOUTH, label_chance3,30,SpringLayout.SOUTH, label_chance2);
        layout2.putConstraint(SpringLayout.WEST, filename_chance,5,SpringLayout.EAST,label_chance3);
        layout2.putConstraint(SpringLayout.SOUTH, filename_chance,30,SpringLayout.SOUTH, Action_chance);
        layout2.putConstraint(SpringLayout.WEST,img_chance ,5,SpringLayout.EAST,filename_chance);
        layout2.putConstraint(SpringLayout.SOUTH, img_chance,30,SpringLayout.SOUTH, Action_chance);
        
        JPanel card2_1 = new JPanel();
        JPanel card2_2 = new JPanel();
		JLabel label_melange_chance= new JLabel("Melange:");
		JTextField question_melange_chance = new JTextField("",20);
		JLabel label_pioche_chance= new JLabel("Pioche:");
		JComboBox<String> question_pioche_chance = new JComboBox<String>(card_types);
		card2_2.add(label_melange_chance);
		card2_2.add(question_melange_chance);
		card2_2.add(label_pioche_chance);
		card2_2.add(question_pioche_chance);

		JLabel label_question_chance= new JLabel("Question:");
		JTextField question_chance= new JTextField("",10);
		JRadioButton label_reponse1_chance= new JRadioButton("Réponse 1:");
		JTextField reponse1_chance= new JTextField("",10);
		JRadioButton label_reponse2_chance= new JRadioButton("Réponse 2:");
		JTextField reponse2_chance= new JTextField("",10);
		JRadioButton label_reponse3_chance= new JRadioButton("Réponse 3:");
		JTextField reponse3_chance= new JTextField("",10);
		JRadioButton label_reponse4_chance= new JRadioButton("Réponse 4:");
		JTextField reponse4_chance= new JTextField("",10);
		
		ButtonGroup reponse_chance = new ButtonGroup();

        JPanel card2_3 = new JPanel();
		
		reponse_chance.add(label_reponse1_chance);
		reponse_chance.add(label_reponse2_chance);
		reponse_chance.add(label_reponse3_chance);
		reponse_chance.add(label_reponse4_chance);

		card2_3.add(label_question_chance);
		card2_3.add(question_chance);
		card2_3.add(label_reponse1_chance);
		card2_3.add(reponse1_chance);
		card2_3.add(label_reponse2_chance);
		card2_3.add(reponse2_chance);
		card2_3.add(label_reponse3_chance);
		card2_3.add(reponse3_chance);
		card2_3.add(label_reponse4_chance);
		card2_3.add(reponse4_chance);

        JPanel Choix_chance = new JPanel(new CardLayout());
        
		Choix_chance.add(card2_1, Actions[0]);
		Choix_chance.add(card2_2, Actions[1]);
		Choix_chance.add(card2_3, Actions[2]);
		
		layout2.putConstraint(SpringLayout.WEST, Choix_chance,5,SpringLayout.WEST, card2);
        layout2.putConstraint(SpringLayout.SOUTH, Choix_chance,40,SpringLayout.SOUTH, img_chance);
		
		card2.add(Choix_chance);
		
		Action_chance.addItemListener(new ItemListener() {
			
			@Override
			public void itemStateChanged(ItemEvent evt) {
		        CardLayout cl = (CardLayout)(Choix_chance.getLayout());
		        cl.show(Choix_chance, (String)evt.getItem());
		    }
		});
        

        img_chance.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent arg0) {
				// TODO Auto-generated method stub

		        JFileChooser c= new JFileChooser();
		        int rVal = c.showOpenDialog(Generateur_de_cartes.this);
		        if (rVal == JFileChooser.APPROVE_OPTION) {
		        	filename_chance.setText(c.getCurrentDirectory().toString()+"\\"+c.getSelectedFile().getName());
		            System.out.println(filename_chance.getText());
		          }
		          if (rVal == JFileChooser.CANCEL_OPTION) {
		        	  filename_chance.setText("");
		          }
			}
		});
        filename_chance.setEditable(false);
        card2.add(filename_chance);
        card2.add(img_chance);
        
        JPanel card3 = new JPanel();// Fruits
        SpringLayout layout3 = new SpringLayout();
        card3.setLayout(layout3);
        JLabel label_fruit1 = new JLabel("Fruit", JLabel.LEFT);
        card3.add(label_fruit1);
        JTextField value_fruit=new JTextField("", 20);
        card3.add(value_fruit);

        
        layout3.putConstraint(SpringLayout.WEST, label_fruit1,5,SpringLayout.WEST, card3);
        layout3.putConstraint(SpringLayout.NORTH, label_fruit1,5,SpringLayout.NORTH, card3);
        layout3.putConstraint(SpringLayout.WEST, value_fruit,5,SpringLayout.EAST, label_fruit1);
        layout3.putConstraint(SpringLayout.NORTH, value_fruit,5,SpringLayout.NORTH, card3);
        
        
        JLabel label_fruit2= new JLabel("Image", JLabel.LEFT);
        JTextField filename_fruit = new JTextField("",20);
        JButton img_fruit = new JButton("Choisir");
        
        layout3.putConstraint(SpringLayout.WEST, label_fruit2,5,SpringLayout.WEST, card3);
        layout3.putConstraint(SpringLayout.SOUTH, label_fruit2,30,SpringLayout.SOUTH, label_fruit1);
        layout3.putConstraint(SpringLayout.WEST, filename_fruit,5,SpringLayout.EAST,label_fruit2);
        layout3.putConstraint(SpringLayout.SOUTH, filename_fruit,30,SpringLayout.SOUTH, value_fruit);
        layout3.putConstraint(SpringLayout.WEST,img_fruit ,5,SpringLayout.EAST,filename_fruit);
        layout3.putConstraint(SpringLayout.SOUTH, img_fruit,30,SpringLayout.SOUTH, value_fruit);
        card3.add(label_fruit2);
        img_fruit.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent arg0) {
				// TODO Auto-generated method stub

		        JFileChooser c= new JFileChooser();
		        int rVal = c.showOpenDialog(Generateur_de_cartes.this);
		        if (rVal == JFileChooser.APPROVE_OPTION) {
		        	filename_fruit.setText(c.getCurrentDirectory().toString()+"\\"+c.getSelectedFile().getName());
		            System.out.println(filename_fruit.getText());
		          }
		          if (rVal == JFileChooser.CANCEL_OPTION) {
		        	  filename_fruit.setText("");
		          }
			}
		});
        
        filename_fruit.setEditable(false);
        card3.add(filename_fruit);
        card3.add(img_fruit);
        
        

        JPanel card4 = new JPanel(); //Légumes
        SpringLayout layout4 = new SpringLayout();
        card4.setLayout(layout4);
        JLabel label_legume1 = new JLabel("Légume", JLabel.LEFT);
        card4.add(label_legume1);
        JTextField value_legume=new JTextField("", 20);
        card4.add(value_legume);

        
        layout4.putConstraint(SpringLayout.WEST, label_legume1,5,SpringLayout.WEST, card4);
        layout4.putConstraint(SpringLayout.NORTH, label_legume1,5,SpringLayout.NORTH, card4);
        layout4.putConstraint(SpringLayout.WEST, value_legume,5,SpringLayout.EAST, label_legume1);
        layout4.putConstraint(SpringLayout.NORTH, value_legume,5,SpringLayout.NORTH, card4);
        
        
        JLabel label_legume2= new JLabel("Image", JLabel.LEFT);
        JTextField filename_legume = new JTextField("",20);
        JButton img_legume = new JButton("Choisir");
        
        layout4.putConstraint(SpringLayout.WEST, label_legume2,5,SpringLayout.WEST, card4);
        layout4.putConstraint(SpringLayout.SOUTH, label_legume2,30,SpringLayout.SOUTH, label_legume1);
        layout4.putConstraint(SpringLayout.WEST, filename_legume,5,SpringLayout.EAST,label_legume2);
        layout4.putConstraint(SpringLayout.SOUTH, filename_legume,30,SpringLayout.SOUTH, value_legume);
        layout4.putConstraint(SpringLayout.WEST,img_legume ,5,SpringLayout.EAST,filename_legume);
        layout4.putConstraint(SpringLayout.SOUTH, img_legume,30,SpringLayout.SOUTH, value_legume);
        card4.add(label_legume2);
        img_legume.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent arg0) {
				// TODO Auto-generated method stub

		        JFileChooser c= new JFileChooser();
		        int rVal = c.showOpenDialog(Generateur_de_cartes.this);
		        if (rVal == JFileChooser.APPROVE_OPTION) {
		        	filename_legume.setText(c.getCurrentDirectory().toString()+"\\"+c.getSelectedFile().getName());
		            System.out.println(filename_legume.getText());
		          }
		          if (rVal == JFileChooser.CANCEL_OPTION) {
		        	  filename_legume.setText("");
		          }
			}
		});
        
        filename_legume.setEditable(false);
        card4.add(filename_legume);
        card4.add(img_legume);
        
        JPanel card5 = new JPanel(); //Plat

        SpringLayout layout5 = new SpringLayout();
        card5.setLayout(layout5);
        JLabel label_plat1 =new JLabel("Premier Plat", JLabel.LEFT);
        card5.add(label_plat1);
        JTextField first_plat=new JTextField("", 20);
        card5.add(first_plat);
        JToggleButton fruit_legume_plat=new JToggleButton("Fruit / Légume");
        JToggleButton interdit_plat=new JToggleButton("Interdit");

        card5.add(fruit_legume_plat);
        card5.add(interdit_plat);

        layout5.putConstraint(SpringLayout.WEST, label_plat1,5,SpringLayout.WEST, card5);
        layout5.putConstraint(SpringLayout.NORTH, label_plat1,5,SpringLayout.NORTH, card5);
        layout5.putConstraint(SpringLayout.WEST, first_plat,5,SpringLayout.EAST, label_plat1);
        layout5.putConstraint(SpringLayout.NORTH, first_plat,5,SpringLayout.NORTH, card5);
        layout5.putConstraint(SpringLayout.WEST, fruit_legume_plat,5,SpringLayout.EAST, first_plat);
        layout5.putConstraint(SpringLayout.NORTH, fruit_legume_plat,5,SpringLayout.NORTH, card5);
        layout5.putConstraint(SpringLayout.WEST, interdit_plat,5,SpringLayout.EAST, fruit_legume_plat);
        layout5.putConstraint(SpringLayout.NORTH, interdit_plat,5,SpringLayout.NORTH, card5);
        
        JLabel label_plat2 =new JLabel("Second Plat", JLabel.LEFT);
        card5.add(label_plat2);
        JTextField second_plat=new JTextField("", 20);
        card5.add(second_plat);

        layout5.putConstraint(SpringLayout.WEST, label_plat2,5,SpringLayout.WEST, card5);
        layout5.putConstraint(SpringLayout.SOUTH, label_plat2,30,SpringLayout.SOUTH, first_plat);
        layout5.putConstraint(SpringLayout.WEST, second_plat,5,SpringLayout.EAST, label_plat2);
        layout5.putConstraint(SpringLayout.SOUTH, second_plat,30,SpringLayout.SOUTH, first_plat);

        
        JLabel label_plat3 =new JLabel("Troisième Plat", JLabel.LEFT);
        card5.add(label_plat3);
        JTextField third_plat=new JTextField("", 20);
        card5.add(third_plat);


        layout5.putConstraint(SpringLayout.WEST, label_plat3,5,SpringLayout.WEST, card5);
        layout5.putConstraint(SpringLayout.SOUTH, label_plat3,30,SpringLayout.SOUTH, second_plat);
        layout5.putConstraint(SpringLayout.WEST, third_plat,5,SpringLayout.EAST, label_plat3);
        layout5.putConstraint(SpringLayout.SOUTH, third_plat,30,SpringLayout.SOUTH, second_plat);

        JLabel label_plat4= new JLabel("Image", JLabel.LEFT);
        JTextField filename_plat = new JTextField("",20);
        JButton img_plat = new JButton("Choisir");
        filename_plat.setEditable(false);

        layout5.putConstraint(SpringLayout.WEST, label_plat4,5,SpringLayout.WEST, card4);
        layout5.putConstraint(SpringLayout.SOUTH, label_plat4,30,SpringLayout.SOUTH, label_plat3);
        layout5.putConstraint(SpringLayout.WEST, filename_plat,5,SpringLayout.EAST,label_plat4);
        layout5.putConstraint(SpringLayout.SOUTH, filename_plat,30,SpringLayout.SOUTH, third_plat);
        layout5.putConstraint(SpringLayout.WEST,img_plat ,5,SpringLayout.EAST,filename_plat);
        layout5.putConstraint(SpringLayout.SOUTH, img_plat,30,SpringLayout.SOUTH, third_plat);
        card5.add(label_plat4);
        card5.add(filename_plat);
        card5.add(img_plat);
        img_plat.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent arg0) {
				// TODO Auto-generated method stub

		        JFileChooser c= new JFileChooser();
		        int rVal = c.showOpenDialog(Generateur_de_cartes.this);
		        if (rVal == JFileChooser.APPROVE_OPTION) {
		        	filename_plat.setText(c.getCurrentDirectory().toString()+"\\"+c.getSelectedFile().getName());
		            System.out.println(filename_plat.getText());
		          }
		          if (rVal == JFileChooser.CANCEL_OPTION) {
		        	  filename_plat.setText("");
		          }
			}
		});
        
        
        JPanel card6 = new JPanel(); //Petit-Déjeuner
        SpringLayout layout6 = new SpringLayout();
        card6.setLayout(layout6);
        JLabel label_dej1 =new JLabel("Premier Déjeuner", JLabel.LEFT);
        card6.add(label_dej1);
        JTextField first_dej=new JTextField("", 20);
        card6.add(first_dej);
        JToggleButton fruit_legume_dej=new JToggleButton("Fruit / Légume");
        JToggleButton interdit_dej=new JToggleButton("Interdit");
        card6.add(fruit_legume_dej);
        card6.add(interdit_dej);

        layout6.putConstraint(SpringLayout.WEST, label_dej1,5,SpringLayout.WEST, card6);
        layout6.putConstraint(SpringLayout.NORTH, label_dej1,5,SpringLayout.NORTH, card6);
        layout6.putConstraint(SpringLayout.WEST, first_dej,5,SpringLayout.EAST, label_dej1);
        layout6.putConstraint(SpringLayout.NORTH, first_dej,5,SpringLayout.NORTH, card6);
        layout6.putConstraint(SpringLayout.WEST, fruit_legume_dej,5,SpringLayout.EAST, first_dej);
        layout6.putConstraint(SpringLayout.NORTH, fruit_legume_dej,5,SpringLayout.NORTH, card6);
        layout6.putConstraint(SpringLayout.WEST, interdit_dej,5,SpringLayout.EAST, fruit_legume_dej);
        layout6.putConstraint(SpringLayout.NORTH, interdit_dej,5,SpringLayout.NORTH, card6);
        
        JLabel label_dej2 =new JLabel("Second Déjeuner", JLabel.LEFT);
        card6.add(label_dej2);
        JTextField second_dej=new JTextField("", 20);
        card6.add(second_dej);

        layout6.putConstraint(SpringLayout.WEST, label_dej2,6,SpringLayout.WEST, card6);
        layout6.putConstraint(SpringLayout.SOUTH, label_dej2,30,SpringLayout.SOUTH, first_dej);
        layout6.putConstraint(SpringLayout.WEST, second_dej,6,SpringLayout.EAST, label_dej2);
        layout6.putConstraint(SpringLayout.SOUTH, second_dej,30,SpringLayout.SOUTH, first_dej);

        
        JLabel label_dej3 =new JLabel("Troisième Déjeuner", JLabel.LEFT);
        card6.add(label_dej3);
        JTextField third_dej=new JTextField("", 20);
        card6.add(third_dej);


        layout6.putConstraint(SpringLayout.WEST, label_dej3,6,SpringLayout.WEST, card6);
        layout6.putConstraint(SpringLayout.SOUTH, label_dej3,30,SpringLayout.SOUTH, second_dej);
        layout6.putConstraint(SpringLayout.WEST, third_dej,6,SpringLayout.EAST, label_dej3);
        layout6.putConstraint(SpringLayout.SOUTH, third_dej,30,SpringLayout.SOUTH, second_dej);
        
        JLabel label_dej4= new JLabel("Image", JLabel.LEFT);
        JTextField filename_dej = new JTextField("",20);
        JButton img_dej = new JButton("Choisir");
        filename_dej.setEditable(false);

        layout6.putConstraint(SpringLayout.WEST, label_dej4,5,SpringLayout.WEST, card6);
        layout6.putConstraint(SpringLayout.SOUTH, label_dej4,30,SpringLayout.SOUTH, label_dej3);
        layout6.putConstraint(SpringLayout.WEST, filename_dej,5,SpringLayout.EAST,label_dej4);
        layout6.putConstraint(SpringLayout.SOUTH, filename_dej,30,SpringLayout.SOUTH, third_dej);
        layout6.putConstraint(SpringLayout.WEST,img_dej ,5,SpringLayout.EAST,filename_dej);
        layout6.putConstraint(SpringLayout.SOUTH, img_dej,30,SpringLayout.SOUTH, third_dej);
        card6.add(label_dej4);
        card6.add(filename_dej);
        card6.add(img_dej);
        img_dej.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent arg0) {
				// TODO Auto-generated method stub

		        JFileChooser c= new JFileChooser();
		        int rVal = c.showOpenDialog(Generateur_de_cartes.this);
		        if (rVal == JFileChooser.APPROVE_OPTION) {
		        	filename_dej.setText(c.getCurrentDirectory().toString()+"\\"+c.getSelectedFile().getName());
		            System.out.println(filename_dej.getText());
		          }
		          if (rVal == JFileChooser.CANCEL_OPTION) {
		        	  filename_dej.setText("");
		          }
			}
		});
        
        
        
        //Create the panel that contains the "cards".
        Panel = new JPanel(new CardLayout());
        Panel.add(card1, card_types[0]);
        Panel.add(card2, card_types[1]);
        Panel.add(card3, card_types[2]);
        Panel.add(card4, card_types[3]);
        Panel.add(card5, card_types[4]);
        Panel.add(card6, card_types[5]);


        pane.add(comboBoxPane, BorderLayout.PAGE_START);
        pane.add(Panel, BorderLayout.CENTER);
        
        comboBoxPane.add(bouton);
        
        //bouton.addActionListener(new SaveL());
        bouton.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent e) {
				// TODO Auto-generated method stub
				JFileChooser c = new JFileChooser();
		          // Demonstrate "Save" dialog:
		          int rVal = c.showSaveDialog(Generateur_de_cartes.this);
		          if (rVal == JFileChooser.APPROVE_OPTION) {
		        	  texte="";
		        	  //Sauvegarde selon le type de carte voulu
		        	  switch ((String)cards.getSelectedItem()) {
						case "La malice":
							texte+="const "+c.getSelectedFile().getName()+" = {\r\n" + 
									" texte:\""+Flavor_malice.getText()+"\"";
							switch ((String)Action_malice.getSelectedItem()) {
							case "Passe Tour":
								texte+=",\r\n action:\"skip[clicks.a%nbJoueurs]=true\"";
								break;
							case "Mélange et pioche":
								texte+=",\r\n action_2: \" remove_all(clicks.a%nbJoueurs,"+question_melange_malice.getText()+" ,'";
								switch ((String) question_pioche_malice.getSelectedItem()) {
								case "La malice":
									texte+="malice";
									break;
								case"La chance":
									texte+="chance";
									break;
								case"Fruits":
									texte+="fruit";
									break;
								case"Légumes":
									texte+="legume";
									break;
								case"Plat":
									texte+="plat";
									break;
								case"Petit-déjeuner/Goûter":
									texte+="petitdej";
									break;
									
								}
								texte+="')\",\r\n" +"action: \"malice( "+c.getSelectedFile().getName()+" )\"";
								break;
							case "Quiz":
								texte+=",\r\n question: \""+question_malice.getText()+"\",\r\n" + 
										"    propositions:[\""+reponse1_malice.getText()+"\"";
										if(reponse2_malice.getText().isEmpty()==false){
											texte+=",\""+reponse2_malice.getText()+"\""; 
										}
										if(reponse3_malice.getText().isEmpty()==false){
											texte+=",\""+reponse3_malice.getText()+"\""; 
										}
										if(reponse4_malice.getText().isEmpty()==false){
											texte+=",\""+reponse4_malice.getText()+"\""; 
										}
										
										
										texte+="],\r\n réponse: \"";
										
										if(label_reponse1_malice.isSelected()) {
											texte+=reponse1_malice.getText();
										}
										else if(label_reponse2_malice.isSelected()) {
											texte+=reponse2_malice.getText();
										}
										else if(label_reponse3_malice.isSelected()) {
											texte+=reponse3_malice.getText();
										}
										else if(label_reponse4_malice.isSelected()) {
											texte+=reponse4_malice.getText();
										}

										texte+="\", \r\n" +"action: \"malice( "+c.getSelectedFile().getName()+" )\"";
								break;
							}
							if(filename_malice.getText().isEmpty()==false){
								texte+=",\r\n img: \""+filename_malice.getText()+"\"\r\n"; 
							}
							texte+="};";
							break;
						case"La chance":
							texte+="const "+c.getSelectedFile().getName()+" = {\r\n" + 
									" texte:\""+Flavor_chance.getText()+"\"";
							switch ((String)Action_chance.getSelectedItem()) {
							case "Passe Tour":
								texte+=",\r\n action:\"skip[clicks.a%nbJoueurs]=true\"";
								break;
							case "Mélange et pioche":
								texte+=",\r\n action_2: \" remove_all(clicks.a%nbJoueurs,"+question_melange_chance.getText()+" ,'";
								switch ((String) question_pioche_chance.getSelectedItem()) {
								case "La malice":
									texte+="malice";
									break;
								case"La chance":
									texte+="chance";
									break;
								case"Fruits":
									texte+="fruit";
									break;
								case"Légumes":
									texte+="legume";
									break;
								case"Plat":
									texte+="plat";
									break;
								case"Petit-déjeuner/Goûter":
									texte+="petitdej";
									break;
									
								}
								texte+="')\",\r\n" +"action: \"malice( "+c.getSelectedFile().getName()+" )\"";
								break;
							case "Quiz":
								texte+=",\r\n question: \""+question_chance.getText()+"\",\r\n" + 
										"    propositions:[\""+reponse1_chance.getText()+"\"";
										if(reponse2_chance.getText().isEmpty()==false){
											texte+=",\""+reponse2_chance.getText()+"\""; 
										}
										if(reponse3_chance.getText().isEmpty()==false){
											texte+=",\""+reponse3_chance.getText()+"\""; 
										}
										if(reponse4_chance.getText().isEmpty()==false){
											texte+=",\""+reponse4_chance.getText()+"\""; 
										}
										
										
										texte+="],\r\n réponse: \"";
										if(label_reponse1_chance.isSelected()) {
											texte+=reponse1_chance.getText();
										}
										else if(label_reponse2_chance.isSelected()) {
											texte+=reponse2_chance.getText();
										}
										else if(label_reponse3_chance.isSelected()) {
											texte+=reponse3_chance.getText();
										}
										else if(label_reponse4_chance.isSelected()) {
											texte+=reponse4_chance.getText();
										}

										texte+="\",\r\n" +"action: \"malice( "+c.getSelectedFile().getName()+" );\"";
								break;
							}
							if(filename_chance.getText().isEmpty()==false){
								texte+=", \r\n img: \""+filename_chance.getText()+"\"\r\n"; 
							}
							texte+="};";
							break;
						case"Fruits":
							texte+="const "+c.getSelectedFile().getName()+" = {\r\n" + 
									"    first:\""+value_fruit.getText()+"\"\r\n";
							if(filename_fruit.getText().isEmpty()==false){
								texte+=",img: \""+filename_fruit.getText()+"\"\r\n"; 
							}
							texte+="};";
							break;
						case"Légumes":
							texte+="const "+c.getSelectedFile().getName()+" = {\r\n" + 
									"    first:\""+value_legume.getText()+"\"\r\n";
							if(filename_legume.getText().isEmpty()==false){
								texte+=",img: \""+filename_legume.getText()+"\"\r\n"; 
							}
							texte+="};";
							break;
						case"Plat":
							texte+="const "+c.getSelectedFile().getName()+" = {\r\n" + 
									"    first:\""+first_plat.getText()+"\"";
							if(second_plat.getText().isEmpty()==false){
								texte+=",\r\n second: \""+second_plat.getText()+"\""; 
							}
							if(third_plat.getText().isEmpty()==false){
								texte+=",\r\n third: \""+third_plat.getText()+"\""; 
							}
							texte+=",\r\n isFruit_Legumes: \""+fruit_legume_plat.getModel().isSelected()+"\"\r\n";
							texte+=",\r\n isInterdit: \""+interdit_plat.getModel().isSelected()+"\"\r\n";
							if(filename_plat.getText().isEmpty()==false) {
								texte+=",\r\n img: \""+filename_plat.getText()+"\"\r\n"; 
							}
							texte+="};";
							break;
						case"Petit-déjeuner/Goûter":
							texte+="const "+c.getSelectedFile().getName()+" = {\r\n" + 
									"first:\""+first_dej.getText()+"\"\r\n";
							if(second_dej.getText().isEmpty()==false){
								texte+=",\r\n second: \""+second_dej.getText()+"\"\r\n"; 
							}
							if(third_dej.getText().isEmpty()==false){
								texte+=",\r\n second: \""+third_dej.getText()+"\"\r\n"; 
							}
							texte+=",isFruit_Legumes: \""+fruit_legume_dej.getModel().isSelected()+"\"\r\n";
							texte+=",\r\n isInterdit: \""+interdit_dej.getModel().isSelected()+"\"\r\n";
							if(filename_dej.getText().isEmpty()==false) {
								texte+=",\r\n img: \""+filename_dej.getText()+"\"\r\n"; 
							}
							texte+="};";
							break;
						default:
							break;
						}
		        	  
		        	/*  */

		            PrintWriter out;
		            try {
		            	String directory=c.getCurrentDirectory().getAbsolutePath()+"\\"+c.getSelectedFile().getName()+".js";
		                out = new PrintWriter(directory);
		                out.println(texte);
		                out.close();
		            } catch (FileNotFoundException x) {
		                System.err.println("File doesn't exist");
		                x.printStackTrace();
		            }
		          }
		          if (rVal == JFileChooser.CANCEL_OPTION) {
		        	  dir.setText("You pressed cancel");
		          }
		          System.out.println(c.getCurrentDirectory().getAbsolutePath()+"\\"+c.getSelectedFile().getName()+".js");
			}
		});
    }
    
 
	public void itemStateChanged(ItemEvent evt) {
        CardLayout cl = (CardLayout)(Panel.getLayout());
        cl.show(Panel, (String)evt.getItem());
    }
	private static void createAndShowGUI() {
        //Create and set up the window.
        JFrame frame = new JFrame("Générateur de cartes");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(640, 480);
        //Create and set up the content pane.
        Generateur_de_cartes demo = new Generateur_de_cartes("Générateur de cartes");
        demo.addComponentToPane(frame.getContentPane());
        
         
        //Display the window.
        frame.setVisible(true);
    }
	
	
	public static void main(String[] args) {
        /* Use an appropriate Look and Feel */
        try {
            //UIManager.setLookAndFeel("com.sun.java.swing.plaf.windows.WindowsLookAndFeel");
            UIManager.setLookAndFeel("javax.swing.plaf.metal.MetalLookAndFeel");
        } catch (UnsupportedLookAndFeelException | IllegalAccessException | InstantiationException | ClassNotFoundException ex) {
            ex.printStackTrace();
        }
        /* Turn off metal's use of bold fonts */
        UIManager.put("swing.boldMetal", Boolean.FALSE);
         
        //Schedule a job for the event dispatch thread:
        //creating and showing this application's GUI.
        javax.swing.SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                createAndShowGUI();
            }
        });
    }
} 